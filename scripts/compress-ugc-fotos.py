#!/usr/bin/env python3
"""
Masters ugc_mady/fotografias/ → public/ugc/fotografias/*.webp

Mismo pipeline que compress-public-images.py:
  - EXIF orientation (no voltear fotos)
  - max 1920px
  - WebP q=82

Naming: _DSC0716.jpg → dsc0716.webp (lowercase, sin _ inicial)

Uso:
  python scripts/compress-ugc-fotos.py
  python scripts/compress-ugc-fotos.py --dry-run
  python scripts/compress-ugc-fotos.py _DSC0716.jpg _DSC0994.png
Requiere: pip install Pillow
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "ugc_mady" / "fotografias"
OUTPUT = ROOT / "public" / "ugc" / "fotografias"
MAX_EDGE = 1920
WEBP_QUALITY = 82
EXTENSIONS = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}


def slugify_stem(stem: str) -> str:
    """_DSC0716 → dsc0716"""
    s = stem.strip().lstrip("_").lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def prepare_image(im):  # type: ignore[no-untyped-def]
    from PIL import Image, ImageOps

    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "P", "LA"):
        im = im.convert("RGB")
    w, h = im.size
    scale = min(1.0, MAX_EDGE / max(w, h))
    if scale < 1.0:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    return im


def compress_one(src: Path, dry_run: bool) -> tuple[str, int, int] | None:
    try:
        from PIL import Image
    except ImportError:
        print("Instala Pillow: pip install Pillow", file=sys.stderr)
        sys.exit(1)

    if not src.is_file() or src.suffix not in EXTENSIONS:
        return None

    out_name = f"{slugify_stem(src.stem)}.webp"
    out = OUTPUT / out_name
    before = src.stat().st_size

    if dry_run:
        print(f"[dry-run] {src.name} ({before // 1024} KB) -> public/ugc/fotografias/{out_name}")
        return out_name, before, before

    OUTPUT.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as raw:
        im = prepare_image(raw)
        im.save(out, "WEBP", quality=WEBP_QUALITY, method=6)

    after = out.stat().st_size
    print(f"OK {src.name}: {before // 1024} KB -> {out_name} ({after // 1024} KB)")
    return out_name, before, after


def main() -> None:
    parser = argparse.ArgumentParser(description="Comprime fotos ugc_mady → public/ugc/fotografias")
    parser.add_argument("files", nargs="*", help="Archivos concretos (default: todos en ugc_mady/fotografias)")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if not SOURCE.is_dir():
        print(f"No existe {SOURCE.relative_to(ROOT)}", file=sys.stderr)
        sys.exit(1)

    if args.files:
        sources = [SOURCE / f if not Path(f).is_absolute() else Path(f) for f in args.files]
    else:
        sources = sorted(SOURCE.iterdir())

    total_b = total_a = count = 0
    written: list[str] = []

    for src in sources:
        r = compress_one(src, args.dry_run)
        if r:
            name, b, a = r
            written.append(name)
            total_b += b
            total_a += a
            count += 1

    if count:
        saved = (total_b - total_a) / 1048576
        print(f"\n{count} fotos -> public/ugc/fotografias/ (~{saved:.1f} MB ahorrados)")
        print("Actualiza lib/producciones.ts con las rutas .webp si son nuevas.")
    else:
        print("Nada que comprimir. Coloca masters en ugc_mady/fotografias/")


if __name__ == "__main__":
    main()
