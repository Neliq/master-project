"""Shared corpus hardening and leak-audit policy.

This module contains only pure helpers so capture, hardening, and verification
use the same policy without importing a script with side effects.
"""
from __future__ import annotations

import re
from html.parser import HTMLParser

# These phrases are analysis/study metadata in this benchmark, not interface
# content. They must not be visible to an auditor.
TEXT_MARKERS = (
    "formal ontology",
    "dark pattern",
    "variant a",
    "variant b",
    "condition 0",
    "condition 1",
    "run semantic analysis",
    "predicted intent",
    "actual backend",
    "subtree ratio",
    "affect 0.",
    "delay_min",
    "threshold",
    "semantic score",
    "the heuristic",
    "analysis remnant",
)

ATTR_MARKER_RE = re.compile(
    r"(?i)(?<![a-z0-9])(?:dark|control|deceptive|benign)(?![a-z0-9])"
)
DARK_CLASS_RE = re.compile(r"(?i)(?<![a-z0-9])dark:")

# Attributes that can carry study metadata. data-* attributes are dropped
# entirely from the static corpus because they are not needed after capture.
METADATA_ATTRS = {"id", "name", "aria-label", "title"}


def scrub_attrs(attrs: list[tuple[str, str | None]]) -> list[tuple[str, str]]:
    """Remove metadata attributes and neutralize variant words."""
    out: list[tuple[str, str]] = []
    for key, value in attrs:
        key_l = key.lower()
        if key_l.startswith("data-"):
            continue
        value = "" if value is None else value
        if key_l in METADATA_ATTRS:
            value = ATTR_MARKER_RE.sub("neutral", value)
        if key_l == "class":
            value = DARK_CLASS_RE.sub("", value)
        out.append((key, value))
    return out


class _VisibleText(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)


def visible_text(html: str) -> str:
    parser = _VisibleText()
    parser.feed(html)
    return " ".join(parser.parts)


def find_leaks(html: str) -> list[str]:
    """Return stable descriptions of policy violations in a fragment."""
    leaks: list[str] = []
    for match in re.finditer(
        r"\b(id|name|aria-label|title)\s*=\s*([\"'])(.*?)\2", html,
        re.IGNORECASE | re.DOTALL,
    ):
        key, _, value = match.groups()
        if ATTR_MARKER_RE.search(value):
            leaks.append(f"attribute:{key}={value}")
    for match in re.finditer(r"(?i)\bdark:", html):
        leaks.append("attribute:dark-class")
    text = visible_text(html).lower()
    for marker in TEXT_MARKERS:
        if marker in text:
            leaks.append(f"text:{marker}")
    return sorted(set(leaks))
