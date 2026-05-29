#!/usr/bin/env python3
"""Redirige al conversor en videos/. Ejecuta: python videos/conversor_videos.py"""
import runpy
import sys
from pathlib import Path

target = Path(__file__).parent / "videos" / "conversor_videos.py"
sys.argv[0] = str(target)
runpy.run_path(str(target), run_name="__main__")
