import json
import re
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PATTERNS = ROOT / "src/lib/patterns.ts"
OUT = ROOT / "public/images/patterns"
WORKFLOW_SOURCE = Path("/home/neliq/.hermes/skills/creative/comfyui/workflows/sd15_txt2img.json")
RUNNER = Path("/home/neliq/.hermes/skills/creative/comfyui/scripts/run_workflow.py")
WORKFLOW = Path("/tmp/master-project-sd15-txt2img.json")
NEGATIVE = (
    "text, words, letters, logo, watermark, typography, writing, alphabet, digits, "
    "numbers, glyphs, captions, labels, signs, posters, signatures, artist marks, "
    "readable marks, color, red, green, yellow, photorealistic, smooth 3d render, "
    "blurry, low quality, deformed, border, frame"
)
STYLE = (
    "rough blue and white screen-print illustration, noisy halftone ink texture, "
    "distressed paper grain, sketchy imperfect hand-drawn linework, bold centered "
    "abstract symbolic icon, isolated on blank paper, square composition, no words"
)


def patterns() -> list[tuple[str, str]]:
    text = PATTERNS.read_text()
    rows = re.findall(r'slug: "([^"\\]+)"\s*,\s*name: "([^"\\]+)"\s*,\s*category: "([^"\\]+)"', text)
    return [(slug, name) for slug, name, category in rows if category != "sneaking"]


def make_workflow() -> None:
    workflow = json.loads(WORKFLOW_SOURCE.read_text())
    WORKFLOW.write_text(json.dumps({k: v for k, v in workflow.items() if isinstance(v, dict)}))


def run_one(slug: str, name: str, seed: int) -> Path:
    prompt = f"{STYLE}, symbolic visual theme: {name.lower()}"
    args = json.dumps({
        "prompt": prompt,
        "negative_prompt": NEGATIVE,
        "seed": seed,
        "steps": 26,
        "cfg": 8.5,
        "width": 512,
        "height": 512,
        "filename_prefix": f"pattern_{slug}",
    })
    result = subprocess.run(
        [sys.executable, str(RUNNER), "--workflow", str(WORKFLOW), "--args", args,
         "--output-dir", "/tmp/master-project-pattern-ai"],
        check=False, capture_output=True, text=True,
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
    destination = OUT / f"{slug}.png"
    output.save(destination, optimize=True)
    return destination


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    make_workflow()
    rows = patterns()
    for index, (slug, name) in enumerate(rows, 1):
        print(run_one(slug, name, 91000 + index * 137), flush=True)
    print(f"generated {len(rows)} remaining thumbnails")
