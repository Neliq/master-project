#!/usr/bin/env python3
"""
Run-3/4 corpus hardening (reconstructed from the skill runbook): strip
EVERYTHING that is not the raw interface, then neutralize colour classes.

Removes:
 - result/explainer boxes (amber/emerald/rose bordered divs with an uppercase
   tracking-tight header or AlertCircle/Check icon)
 - sandbox control buttons (restart / scan / fast-forward / simulate / ...)
 - analysis sentences (marker vocabulary, sentence surgery on text nodes)
 - leaky name/id/aria-label/title attributes (benign/deceptive -> control)
 - React empty comments and residual notation tokens
Neutralizes ALL tailwind colour utilities to a single `accent` token
(variant-marker colours were a corpus-wide tell).
"""
import pathlib
import os
import re
from html.parser import HTMLParser

EXP = pathlib.Path("/home/neliq/Coding/master-project/experiment-data")
CORPUS = pathlib.Path(os.environ.get("CORPUS_DIR", EXP / "corpus"))

STRONG_MARKERS = [
    "the threshold", "weaponiz", "your gaze", "decision fatigue", "the provider wins",
    "passive compliance", "the wording is what does the work", "informs instead of attacking",
    "fight through the copy", "ner:", "ner-extracted", "extracted entity", "simulated clock",
    "fast-forward", "[object object]", "the intent)", "cognitive state", "density",
    "linguistic", "urgency words", "scan copy", "the salience", "rational deliberation",
    "herd-following", "artificial delay", "predatory", "overload", "disparity",
    "triggered", "exceeds", "the trap", "exploit", "manipulat", "coerce", "nudge",
    "deceptive", "benign", "restore informed refusal", "restore informed consent",
    "the paywall becomes", "ordinary — the wording", "trapped upgrade", "coercion density",
    "analyze coercion", "threshold crossed", "auto-fetching", "injecting next batch",
    "hick's law", "path of least resistance", "provider-favorable default", "v_trap",
    "no exit without", "the rate =", "the count =", "the weight =", "the distance =",
    "the probability =", "the delay =", "the change =", "the difference =", "the area/the",
    "/the viewport", "> the", "< the", "min the", "max the", "≈ the", "exceeds the",
    "deliberately configured", "below the deadline", "watch the text",
    "any marker that says", "displayed =", "live backend analytics",
    "stable across refreshes", "wcag 2.1", "wcag minimum",
    "the close target in the corner is", "easy to see and easy to hit",
    "pre-checked at t0", "checked at t0", "pre-checked, hidden at t0",
    "the boxes below were checked before you arrived", "no user event required",
    "v = false", "v = true", "sentiment(", "sentiment spread",
    "fear words stacked", "fkgl", "«", "»", "consent assumed",
    "semantic score", "toxic semantic", "manufactures guilt",
    "can you tell", "added by you", "you upgraded", "visual weight meter",
    "pre-selected for you", "everything below was", "the heuristic",
    "lexemes", "semantic-proximity", "the weight —", "loss-framed",
    "pre-checked at load", "state = true", "state = false", "subtree lacks",
    "provider-favorable", "parsed by the", "zero user events",
    "dom(critical)", "differs from browser", "the one button in your own language",
    "every exit from this state", "imperative verbs",
    "within a plausible band", "check the math", "the discount =", "dom depth",
    "you clicked", "predicted intent", "the backend actually executed",
    "pre-selected", "within the plausible band", "the plausible band",
    "the anchor reflects", "optinall", "the sim,",
]

BUTTON_STOP = ["restart demo", "restart", "scan copy", "scan", "fast-forward",
               "simulate", "simulator", "advance to", "skip ahead"]

VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input",
             "link", "meta", "param", "source", "track", "wbr"}


class Node:
    __slots__ = ("tag", "attrs", "children", "text")
    def __init__(self, tag, attrs):
        self.tag = tag
        self.attrs = attrs
        self.children = []
        self.text = ""


def build_tree(s):
    class P(HTMLParser):
        def __init__(self):
            super().__init__(convert_charrefs=True)
            self.stack = [Node("root", [])]
        def handle_starttag(self, tag, attrs):
            node = Node(tag, list(attrs))
            self.stack[-1].children.append(node)
            if tag not in VOID_TAGS:
                self.stack.append(node)
        def handle_startendtag(self, tag, attrs):
            self.stack[-1].children.append(Node(tag, list(attrs)))
        def handle_endtag(self, tag):
            for i in range(len(self.stack) - 1, 0, -1):
                if self.stack[i].tag == tag:
                    self.stack = self.stack[:i]
                    break
        def handle_data(self, data):
            if data.strip():
                self.stack[-1].children.append(data)
                self.stack[-1].text += data
    p = P()
    p.feed(s)
    return p.stack[0]


def full_text(node):
    if isinstance(node, str):
        return node
    parts = [node.text]
    for c in node.children:
        parts.append(full_text(c))
    return "".join(parts)


def has_element_children(node):
    return any(isinstance(c, Node) for c in node.children)


def drop_marker_sentences(text, markers):
    parts = re.split(r"(?<=[.!?])\s+", text)
    kept = [p for p in parts if not any(m in p.lower() for m in markers)]
    return " ".join(kept).strip()


def scrub_text_nodes(node, markers):
    new_children = []
    for c in node.children:
        if isinstance(c, str):
            t = drop_marker_sentences(c, markers)
            if t.strip():
                new_children.append(t)
        elif isinstance(c, Node):
            scrub_text_nodes(c, markers)
            new_children.append(c)
    node.children = new_children
    node.text = "".join(c if isinstance(c, str) else full_text(c) for c in new_children)


def is_analysis_box(node):
    if not isinstance(node, Node) or node.tag != "div":
        return False
    cls = dict(node.attrs).get("class", "")
    has_bg = any(c in cls for c in ("bg-amber", "bg-emerald", "bg-rose", "bg-teal"))
    has_border = any(c in cls for c in ("border-amber", "border-emerald", "border-rose", "border-teal"))
    if not (has_bg and has_border):
        return False

    def walk(n):
        if isinstance(n, str):
            return ""
        if isinstance(n, Node):
            if "tracking-tight" in dict(n.attrs).get("class", ""):
                return "HDR"
            out = ""
            for c in n.children:
                out += walk(c)
            return out
        return ""
    if walk(node) == "HDR":
        return True
    txt = full_text(node)
    return "M12 9v4m0 4h.01" in txt or "M20 6L9 17l-5-5" in txt or "M9 12l2 2 4-4" in txt


def harden_node(node, parent_list):
    if isinstance(node, str):
        return [node]
    txt_pre = full_text(node)
    low_pre = txt_pre.lower()
    matched_pre = [m for m in STRONG_MARKERS if m in low_pre]
    out = []
    for child in node.children:
        out.extend(harden_node(child, node.children))
    node.children = out

    txt = full_text(node)
    low = txt.lower()

    if is_analysis_box(node):
        return []
    if node.tag == "button":
        b = low.strip()
        if any(w in b for w in BUTTON_STOP):
            return []
        if "simulated clock" in low:
            return []
    if node.tag in ("p", "div", "span", "li", "h1", "h2", "h3", "h4", "small", "strong", "em", "label", "button"):
        matched = matched_pre or [m for m in STRONG_MARKERS if m in low]
        if matched:
            if node.tag == "p" or not has_element_children(node):
                scrub_text_nodes(node, matched)
                if not full_text(node).strip():
                    return []
            elif len(txt_pre) <= 400:
                # short container: surgery; drop ONLY if nothing survives
                scrub_text_nodes(node, matched)
                if len(full_text(node).strip()) < 40:
                    return []
            else:
                scrub_text_nodes(node, matched)
                if not full_text(node).strip():
                    return []
    if node.tag == "input":
        attrs = dict(node.attrs)
        for k in ("name", "id", "aria-label", "title"):
            if k in attrs:
                attrs[k] = re.sub(r"(?i)(benign|deceptive)", "control", attrs[k])
        node.attrs = list(attrs.items())
    return [node]


def serialize(node):
    if isinstance(node, str):
        return node
    attrs = "".join(f' {k}="{v}"' for k, v in node.attrs)
    inner = "".join(serialize(c) for c in node.children)
    if node.tag in VOID_TAGS:
        return f"<{node.tag}{attrs}/>"
    return f"<{node.tag}{attrs}>{inner}</{node.tag}>"


COLOR_RE = re.compile(
    r"(?:text|bg|border|from|via|to|ring|divide|accent|shadow|decoration|outline|fill|stroke)-"
    r"(?:rose|emerald|red|green|amber|indigo|purple|teal|blue|sky|cyan|orange|yellow|pink|"
    r"violet|slate|gray|zinc|neutral|stone|white|black|muted|foreground|background|card|"
    r"destructive|primary|secondary)(?:-[0-9]+)?(?:/[0-9]+)?"
)


def neutralize_colors(s):
    return COLOR_RE.sub("accent", s)


def process_file(path):
    raw = path.read_text()
    states = re.split(r"<!-- state s\d+ -->", raw)
    out_states = []
    for st in states:
        if not st.strip():
            continue
        root = build_tree(st)
        children = []
        for c in root.children:
            children.extend(harden_node(c, root.children))
        root.children = children
        serialized = "".join(serialize(c) for c in root.children)
        serialized = re.sub(r"<!--\s*-->", "", serialized)
        serialized = re.sub(r"τ\s*_[A-Za-z0-9_]+", "the threshold", serialized)
        serialized = re.sub(r"τ", "the threshold", serialized)
        serialized = neutralize_colors(serialized)
        serialized = re.sub(r"\s{2,}", " ", serialized)
        plain = re.sub(r"<[^>]+>", " ", serialized)
        if len(plain.strip()) >= 40:
            out_states.append(serialized)
    if not out_states:
        path.unlink()
        return "EMPTIED"
    body = "\n".join(f"<!-- state s{i} -->\n{s}" for i, s in enumerate(out_states))
    path.write_text(body)
    return "ok"


files = sorted(CORPUS.glob("*.html"))
n_ok = n_empty = 0
for f in files:
    r = process_file(f)
    if r == "EMPTIED":
        print(f"EMPTIED {f.name}")
        n_empty += 1
    else:
        n_ok += 1
print(f"processed {n_ok}, emptied {n_empty}")
