#!/usr/bin/env python3
"""Create per-instance visual sheets from the captured state screenshots."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1] / "run6-multimodal" / "evidence"
for bundle in sorted(p for p in ROOT.iterdir() if p.is_dir()):
    images = []
    for path in sorted(bundle.glob("s*.png"), key=lambda p: int(p.stem[1:])):
        with Image.open(path) as source:
            image = source.convert("RGB")
            # Keep screenshot content intact; enlarge narrow B-side panels only
            # so text is inspectable in one required vision call.
            width = 900
            if image.width != width:
                height = round(image.height * width / image.width)
                image = image.resize((width, height), Image.Resampling.LANCZOS)
            images.append(image)
    if not images:
        raise SystemExit(f"no state screenshots for {bundle.name}")
    width = max(image.width for image in images)
    height = sum(image.height for image in images) + 8 * (len(images) - 1)
    sheet = Image.new("RGB", (width, height), "white")
    y = 0
    for image in images:
        sheet.paste(image, (0, y))
        y += image.height + 8
    sheet.save(bundle / "visual-sheet.png", optimize=True)
print(f"created {len([p for p in ROOT.iterdir() if p.is_dir()])} visual sheets")
