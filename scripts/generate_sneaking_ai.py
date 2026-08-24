import json
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/images/sneaking"
WORKFLOW_SOURCE = Path("/home/neliq/.hermes/skills/creative/comfyui/workflows/sd15_txt2img.json")
RUNNER = Path("/home/neliq/.hermes/skills/creative/comfyui/scripts/run_workflow.py")
WORKFLOW = Path("/tmp/master-project-sd15-txt2img.json")

NEGATIVE = (
    "text, words, letters, logo, watermark, typography, writing, alphabet, digits, "
    "numbers, glyphs, captions, labels, signs, posters, signatures, artist marks, "
    "readable marks, color, red, "
    "green, yellow, photorealistic, smooth 3d render, blurry, low quality, deformed, "
    "border, frame"
)
STYLE = (
    "rough blue and white screen-print illustration, noisy halftone ink texture, "
    "distressed paper grain, sketchy imperfect hand-drawn linework, bold centered "
    "graphic silhouette, square composition, no words, no letters"
)
PROMPTS = {
    "intermediate-currency": "stacked coins passing through a strange exchange machine, one coin trapped outside",
    "disguised-ad": "a smiling mask hiding a loud megaphone behind a clean doorway",
    "sneak-into-basket": "a small unwanted package being secretly dropped into a shopping basket",
    "drip-pricing": "an abstract hourglass with coins and liquid drops falling through it, isolated icon on blank paper",
    "bundling": "several different objects tied together in one oversized impossible package",
    "hidden-information": "an eye partly covered by dense tangled lines and a tiny concealed key",
    "reduced-friction": "a finger sliding down a frictionless ramp into a sharp lightning bolt",
    "forced-continuity": "a clock caught inside a circular arrow loop with a payment coin",
    "privacy-zuckering": "a human figure at the center of a web of many watching eyes",
    "friend-spam": "a central hand broadcasting identical envelopes toward a crowd of silhouettes",
    "address-book-leeching": "roots growing from an open address book into a network of human figures",
    "automatic-accept-third-party-term": "two hands forcing a large agreement sheet toward a smaller hand",
    "pre-delivered-content": "abstract nested geometric boxes, one smaller box already inside a larger box, isolated icon on blank paper",
}


def make_workflow() -> None:
    workflow = json.loads(WORKFLOW_SOURCE.read_text())
    workflow = {key: value for key, value in workflow.items() if isinstance(value, dict)}
    WORKFLOW.write_text(json.dumps(workflow))


def run_one(slug: str, subject: str, seed: int) -> Path:
    prompt = f"{STYLE}, {subject}"
    args = json.dumps(
        {
            "prompt": prompt,
            "negative_prompt": NEGATIVE,
            "seed": seed,
            "steps": 28,
            "cfg": 8.5,
            "width": 512,
            "height": 512,
            "filename_prefix": f"sneaking_{slug}",
        }
    )
    result = subprocess.run(
        [sys.executable, str(RUNNER), "--workflow", str(WORKFLOW), "--args", args, "--output-dir", "/tmp/master-project-sneaking-ai"],
        check=False,
        capture_output=True,
        text=True,
    )
    marker = result.stdout.rfind('{\n  "status"')
    payload = json.loads(result.stdout[marker:]) if marker >= 0 else {}
    if result.returncode or payload.get("status") != "success":
        raise RuntimeError(f"generation failed for {slug}: {result.stdout}\n{result.stderr}")
    source = Path(payload["outputs"][0]["file"])
    image = Image.open(source).convert("L").resize((800, 800), Image.Resampling.LANCZOS)
    dithered = image.convert("1", dither=Image.Dither.FLOYDSTEINBERG)
    output = Image.new("RGB", dithered.size, "#0000f2")
    output.putdata([(255, 255, 255) if pixel else (0, 0, 242) for pixel in dithered.getdata()])
    crop_boxes = {
        "friend-spam": (0, 0, 500, 800),
        "pre-delivered-content": (150, 0, 800, 800),
        "sneak-into-basket": (180, 0, 800, 800),
    }
    if slug in crop_boxes:
        output = output.crop(crop_boxes[slug]).resize((800, 800), Image.Resampling.LANCZOS)
        if slug == "pre-delivered-content":
            ImageDraw.Draw(output).rectangle((100, 245, 555, 575), fill="#0000f2")
        dithered = output.convert("L").convert("1", dither=Image.Dither.FLOYDSTEINBERG)
        output = Image.new("RGB", dithered.size, "#0000f2")
        output.putdata([(255, 255, 255) if pixel else (0, 0, 242) for pixel in dithered.getdata()])
    destination = OUT / f"{slug}.png"
    output.save(destination, optimize=True)
    return destination


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    make_workflow()
    for index, (slug, subject) in enumerate(PROMPTS.items(), 1):
        destination = run_one(slug, subject, 81000 + index * 137)
        print(destination)
    for svg in OUT.glob("*.svg"):
        svg.unlink()
    print(f"generated {len(PROMPTS)} AI thumbnails")
