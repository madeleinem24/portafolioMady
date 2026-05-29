#!/usr/bin/env python3
"""
Comprime imágenes en public/ a WebP (max 1920px).
Aplica EXIF orientation (ImageOps.exif_transpose) para no voltear fotos.
Uso: python scripts/compress-public-images.py [--all]
Requiere: pip install Pillow
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
MAX_EDGE = 1920
WEBP_QUALITY = 82
MIN_BYTES = 0  # --all procesa todo; por defecto solo > 400 KB
EXTENSIONS = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}


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


def compress(path: Path, min_bytes: int) -> tuple[int, int] | None:
    try:
        from PIL import Image
    except ImportError:
        print("Instala Pillow: pip install Pillow", file=sys.stderr)
        sys.exit(1)

    before = path.stat().st_size
    if before < min_bytes:
        return None

    with Image.open(path) as raw:
        im = prepare_image(raw)
        out = path.with_suffix(".webp")
        im.save(out, "WEBP", quality=WEBP_QUALITY, method=6)
        after = out.stat().st_size
        print(f"OK {path.relative_to(ROOT)}: {before // 1024} KB -> {out.name} {after // 1024} KB")
        return before, after


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="Incluir archivos < 400 KB")
    args = parser.parse_args()

    min_bytes = 0 if args.all else 400_000
    total_b = total_a = count = 0

    for path in sorted(PUBLIC.rglob("*")):
        if path.suffix not in EXTENSIONS or not path.is_file():
            continue
        r = compress(path, min_bytes)
        if r:
            total_b += r[0]
            total_a += r[1]
            count += 1

    if count:
        print(f"\n{count} archivos regenerados.")
    else:
        print("Sin archivos para comprimir (restaura originales desde git si hace falta).")


if __name__ == "__main__":
    main()
