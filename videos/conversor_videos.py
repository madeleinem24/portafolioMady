#!/usr/bin/env python3
"""
Conversor y catálogo de video — Madeleine Portfolio.

Manifiesto: videos/videos.manifest.json
Salidas:    videos/ o videos/out/ (segun outputPath en manifiesto)
Catálogo:   videos/videos.ts (sync)

Uso (desde la raíz del repo):
  python videos/conversor_videos.py list
  python videos/conversor_videos.py group cortefino-tiktok --720
  python videos/conversor_videos.py cortefino-asmr --720
  python videos/conversor_videos.py cloudinary cortefino-asmr "https://res.cloudinary.com/..."
  python videos/conversor_videos.py sync
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse

VIDEOS_DIR = Path(__file__).resolve().parent
ROOT = VIDEOS_DIR.parent
MANIFEST = VIDEOS_DIR / "videos.manifest.json"
OUT_DIR = VIDEOS_DIR / "out"
CATALOG_TS = VIDEOS_DIR / "videos.ts"

OUTPUT_SUFFIXES = ("_web", "_720p", "_small")

PRESETS: dict[str, dict[str, Any]] = {
    "web": {
        "suffix": "_web",
        "args": [
            "-c:v", "libx264", "-preset", "slow", "-crf", "24",
            "-vf", "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2",
            "-c:a", "aac", "-b:a", "128k",
        ],
    },
    "720": {
        "suffix": "_720p",
        "args": [
            "-c:v", "libx264", "-preset", "slow", "-crf", "26",
            "-vf", "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2",
            "-c:a", "aac", "-b:a", "96k",
        ],
    },
    "720hd": {
        "suffix": "_720p",
        "args": [
            "-c:v", "libx264", "-preset", "slow", "-crf", "26",
            "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
            "-c:a", "aac", "-b:a", "128k",
        ],
    },
    "720hd-cloud": {
        "suffix": "_720p",
        "args": [
            "-c:v", "libx264", "-preset", "slow", "-crf", "30",
            "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
            "-maxrate", "800k", "-bufsize", "1600k",
            "-c:a", "aac", "-b:a", "96k", "-ac", "2",
        ],
    },
    "small": {
        "suffix": "_small",
        "args": [
            "-c:v", "libx264", "-preset", "slow", "-crf", "28",
            "-c:a", "aac", "-b:a", "96k",
        ],
    },
}


@dataclass
class VideoEntry:
    key: str
    group: str
    kind: str
    source_path_rel: str
    id: str
    slug: str
    title: str
    client: str
    tiktok_url: str
    video_alt: str
    like_count: str | int
    comment_count: str | int
    posted_ago: str
    preview: dict[str, int]
    cloudinary: dict[str, Any] | None
    output_path_rel: str
    preset_name: str

    @property
    def source_path(self) -> Path:
        return ROOT / self.source_path_rel if self.source_path_rel else ROOT / "_missing"

    def stem(self) -> str:
        return Path(self.source_path_rel).stem if self.source_path_rel else self.key

    def output_path(self, preset: str | None = None) -> Path:
        if not self.source_path_rel:
            die(f"{self.key} no tiene sourcePath local")
        active = preset or self.preset_name
        if self.output_path_rel:
            return VIDEOS_DIR / self.output_path_rel
        rel = Path(self.source_path_rel)
        out_rel = rel.parent / f"{rel.stem}{PRESETS[active]['suffix']}.mp4"
        return OUT_DIR / out_rel

    def best_local_path(self) -> Path:
        for preset in ("720", "web", "small"):
            p = self.output_path(preset)
            if p.exists():
                return p
        if self.source_path_rel and self.source_path.exists():
            return self.source_path
        die(f"No hay archivo local para {self.key}")


def load_manifest() -> list[VideoEntry]:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    entries: list[VideoEntry] = []
    for raw in data.get("videos", []):
        entries.append(
            VideoEntry(
                key=raw["key"],
                group=raw.get("group", ""),
                kind=raw.get("kind", "tiktok"),
                source_path_rel=raw.get("sourcePath", ""),
                id=raw["id"],
                slug=raw["slug"],
                title=raw["title"],
                client=raw.get("client", ""),
                tiktok_url=raw.get("tiktokUrl", ""),
                video_alt=raw.get("videoAlt", ""),
                like_count=raw.get("likeCount", ""),
                comment_count=raw.get("commentCount", ""),
                posted_ago=raw.get("postedAgo", ""),
                preview=raw.get("preview", {"start": 0, "duration": 5}),
                cloudinary=raw.get("cloudinary"),
                output_path_rel=raw.get("outputPath", ""),
                preset_name=raw.get("preset", "720"),
            )
        )
    return entries


def save_manifest(entries: list[VideoEntry]) -> None:
    payload = {
        "videos": [
            {
                "key": e.key,
                "group": e.group,
                "kind": e.kind,
                "sourcePath": e.source_path_rel,
                "id": e.id,
                "slug": e.slug,
                "title": e.title,
                "client": e.client,
                "tiktokUrl": e.tiktok_url,
                "videoAlt": e.video_alt,
                "likeCount": e.like_count,
                "commentCount": e.comment_count,
                "postedAgo": e.posted_ago,
                "preview": e.preview,
                "cloudinary": e.cloudinary,
                "outputPath": e.output_path_rel or None,
                "preset": e.preset_name if e.preset_name != "720" else None,
            }
            for e in entries
        ]
    }
    for item in payload["videos"]:
        if item.get("outputPath") is None:
            del item["outputPath"]
        if item.get("preset") is None:
            del item["preset"]
    MANIFEST.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def die(msg: str, code: int = 1) -> None:
    print(f"Error: {msg}", file=sys.stderr)
    sys.exit(code)


def require_ffmpeg() -> str:
    exe = shutil.which("ffmpeg")
    if not exe:
        die("FFmpeg no esta en PATH. Instala con: winget install Gyan.FFmpeg")
    return exe


def normalize_key(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", text.lower())


def find_entry(entries: list[VideoEntry], query: str) -> VideoEntry:
    q = normalize_key(query)
    for e in entries:
        if normalize_key(e.key) == q or normalize_key(e.slug) == q:
            return e
        if e.source_path_rel and (
            normalize_key(Path(e.source_path_rel).stem) == q
            or q in normalize_key(Path(e.source_path_rel).stem)
        ):
            return e
    die(f'No se encontro "{query}". Usa: list')


def find_group(entries: list[VideoEntry], group: str) -> list[VideoEntry]:
    g = normalize_key(group)
    matched = [e for e in entries if normalize_key(e.group) == g and e.source_path_rel]
    if not matched:
        die(f'Grupo "{group}" sin videos con sourcePath')
    return matched


def fmt_mb(path: Path) -> str:
    return f"{path.stat().st_size / 1024 / 1024:.2f} MB"


def run_ffmpeg(input_path: Path, output_path: Path, preset: str) -> None:
    require_ffmpeg()
    if preset not in PRESETS:
        die(f"Preset desconocido: {preset}")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg", "-y", "-i", str(input_path),
        *PRESETS[preset]["args"],
        "-movflags", "+faststart",
        str(output_path),
    ]
    print(f"\n>> {input_path.name} -> {output_path} [{preset}]")
    result = subprocess.run(cmd)
    if result.returncode != 0:
        die(f"FFmpeg fallo (preset {preset})")
    before = input_path.stat().st_size
    after = output_path.stat().st_size
    pct = (1 - after / before) * 100 if before else 0
    print(f"OK {fmt_mb(input_path)} -> {fmt_mb(output_path)} (-{pct:.0f}%)")


def cmd_list(entries: list[VideoEntry]) -> None:
    print(f"{'KEY':<22} {'KIND':<10} {'GROUP':<22} CLOUD")
    print("-" * 80)
    for e in entries:
        cloud = "si" if e.cloudinary else "-"
        src = Path(e.source_path_rel).name if e.source_path_rel else "(cloud)"
        print(f"{e.key:<22} {e.kind:<10} {e.group:<22} {cloud}  {src}")


def cmd_info(entry: VideoEntry) -> None:
    print(f"key:        {entry.key}")
    print(f"kind:       {entry.kind}")
    print(f"group:      {entry.group}")
    print(f"slug:       {entry.slug}")
    if entry.source_path_rel:
        print(f"sourcePath: {entry.source_path_rel}")
        if entry.source_path.exists():
            print(f"  size:     {fmt_mb(entry.source_path)}")
    for preset in ("720", "web", "small"):
        try:
            out = entry.output_path(preset)
            if out.exists():
                print(f"  {preset}:       {out.relative_to(ROOT)} ({fmt_mb(out)})")
        except SystemExit:
            pass
    if entry.cloudinary:
        print(f"cloudinary: {entry.cloudinary.get('publicId')} v{entry.cloudinary.get('version', '?')}")


def cmd_ruta(entry: VideoEntry, preset: str | None) -> None:
    path = entry.output_path(preset) if preset else entry.best_local_path()
    if preset and not path.exists():
        die(f"No existe salida {preset}. Ejecuta --{preset} primero.")
    print(path.resolve())


def parse_cloudinary_url(url: str) -> dict[str, Any]:
    path = urlparse(url).path.strip("/")
    m = re.search(r"/video/upload/(?:[^/]+/)*v(\d+)/([^/]+)\.mp4", path, re.I)
    if m:
        return {
            "publicId": unquote(m.group(2)),
            "version": int(m.group(1)),
            "url": url.strip(),
        }
    m = re.search(r"/video/upload/(?:[^/]+/)*([^/]+)\.mp4", path, re.I)
    if m:
        return {"publicId": unquote(m.group(1)), "version": None, "url": url.strip()}
    die("URL de Cloudinary no reconocida")


def cmd_cloudinary(entries: list[VideoEntry], query: str, url: str) -> None:
    entry = find_entry(entries, query)
    entry.cloudinary = parse_cloudinary_url(url)
    save_manifest(entries)
    print(f"OK {entry.key} registrado en manifiesto")


def ts_str(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def ts_optional_str(value: str) -> str | None:
    return ts_str(value) if value else None


def ts_count(value: str | int) -> str:
    if value == "" or value is None:
        return ""
    if isinstance(value, int):
        return str(value)
    return ts_str(str(value))


def generate_catalog_block(entries: list[VideoEntry]) -> str:
    lines = ["export const videoCatalog: CatalogVideo[] = ["]
    for e in entries:
        lines.append("  {")
        lines.append(f"    id:            {ts_str(e.id)},")
        lines.append(f"    slug:          {ts_str(e.slug)},")
        lines.append(f"    kind:          {ts_str(e.kind)},")
        lines.append(f"    group:         {ts_str(e.group)},")
        if e.source_path_rel:
            lines.append(f"    sourcePath:    {ts_str(e.source_path_rel)},")
        lines.append(f"    title:         {ts_str(e.title)},")
        if e.client:
            lines.append(f"    client:        {ts_str(e.client)},")
        lines.append(f"    tiktokUrl:     {ts_str(e.tiktok_url)},")
        if e.cloudinary and e.cloudinary.get("publicId"):
            lines.append(f"    publicId:      {ts_str(e.cloudinary['publicId'])},")
            if e.cloudinary.get("version") is not None:
                lines.append(f"    version:       {e.cloudinary['version']},")
            if e.cloudinary.get("url"):
                lines.append(f"    cloudinaryUrl: {ts_str(e.cloudinary['url'])},")
        lines.append(f"    preview:       {{ start: {e.preview.get('start', 0)}, duration: {e.preview.get('duration', 5)} }},")
        lines.append(f"    videoAlt:      {ts_str(e.video_alt)},")
        if e.like_count != "":
            lines.append(f"    likeCount:     {ts_count(e.like_count)},")
        if e.comment_count != "":
            lines.append(f"    commentCount:  {ts_count(e.comment_count)},")
        if e.posted_ago:
            lines.append(f"    postedAgo:     {ts_str(e.posted_ago)},")
        lines.append("  },")
    lines.append("]")
    return "\n".join(lines)


def cmd_sync(entries: list[VideoEntry]) -> None:
    content = CATALOG_TS.read_text(encoding="utf-8")
    start, end = "// @catalog-start", "// @catalog-end"
    if start not in content:
        die(f"Marcador {start} no encontrado en videos/videos.ts")
    block = generate_catalog_block(entries)
    new_content = re.sub(
        rf"{re.escape(start)}.*?{re.escape(end)}",
        f"{start}\n{block}\n{end}",
        content,
        count=1,
        flags=re.DOTALL,
    )
    CATALOG_TS.write_text(new_content, encoding="utf-8")
    print(f"OK videos/videos.ts ({len(entries)} entradas)")


def cmd_convert(entry: VideoEntry, presets: list[str]) -> None:
    src = entry.source_path
    if not src.exists():
        die(f"Fuente no encontrada: {src}")
    if entry.output_path_rel:
        run_ffmpeg(src, entry.output_path(), entry.preset_name)
        return
    if "all" in presets:
        presets = ["web", "720", "small"]
    for preset in presets:
        run_ffmpeg(src, entry.output_path(preset), preset)


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Conversor y catalogo de video.")
    p.add_argument("tokens", nargs="*", help="list | sync | group <g> | cloudinary <k> <url> | <key>")
    p.add_argument("--720", dest="p720", action="store_true")
    p.add_argument("--web", dest="pweb", action="store_true")
    p.add_argument("--small", dest="psmall", action="store_true")
    p.add_argument("--all", dest="pall", action="store_true")
    p.add_argument("--info", action="store_true")
    p.add_argument("--ruta", action="store_true")
    return p


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    entries = load_manifest()
    tokens = args.tokens or []

    if not tokens:
        parser.print_help()
        return

    head = tokens[0].lower()

    if head == "list":
        cmd_list(entries)
        return

    if head == "sync":
        cmd_sync(entries)
        return

    if head == "group":
        if len(tokens) < 2:
            die("Uso: group <nombre-grupo> [--720]")
        group_entries = find_group(entries, tokens[1])
        presets: list[str] = []
        if args.pall:
            presets.append("all")
        if args.pweb:
            presets.append("web")
        if args.p720:
            presets.append("720")
        if args.psmall:
            presets.append("small")
        if not presets:
            presets = ["720"]
        for entry in group_entries:
            cmd_convert(entry, presets)
        return

    if head == "cloudinary":
        if len(tokens) < 3:
            die('Uso: cloudinary <key> "<url>"')
        cmd_cloudinary(entries, tokens[1], tokens[2])
        cmd_sync(entries)
        return

    entry = find_entry(entries, tokens[0])

    if args.info:
        cmd_info(entry)
        return

    if args.ruta:
        preset = "720" if args.p720 else ("web" if args.pweb else ("small" if args.psmall else None))
        cmd_ruta(entry, preset)
        return

    presets = []
    if args.pall:
        presets.append("all")
    if args.pweb:
        presets.append("web")
    if args.p720:
        presets.append("720")
    if args.psmall:
        presets.append("small")
    if presets:
        cmd_convert(entry, presets)
        return

    parser.print_help()


if __name__ == "__main__":
    main()
