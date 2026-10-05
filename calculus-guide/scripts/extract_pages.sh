#!/usr/bin/env bash
# scripts/extract_pages.sh
# Extract target page ranges from Thomas' Calculus PDF using pdftoppm / pdftotext
# Usage: ./scripts/extract_pages.sh <start_page> <end_page> [output_dir] [pdf_path]
set -euo pipefail

START_PAGE=${1:-1}
END_PAGE=${2:-1}
OUTPUT_DIR=${3:-"source/extracted"}
PDF_PATH=${4:-"../Thomas-Calculus-14th-Edition-[konkur.in].pdf"}

mkdir -p "$OUTPUT_DIR"

echo "=== Extracting pages $START_PAGE to $END_PAGE from $PDF_PATH ==="

if ! command -v pdftoppm &> /dev/null || ! command -v pdftotext &> /dev/null; then
  echo "INFO: pdftoppm or pdftotext not found on PATH. Falling back to Python pypdf extractor..."
  python scripts/extract_pages.py --start "$START_PAGE" --end "$END_PAGE" --pdf "$PDF_PATH" --out "$OUTPUT_DIR"
  exit 0
fi

echo "Running pdftoppm (150 DPI PNG)..."
pdftoppm -png -r 150 -f "$START_PAGE" -l "$END_PAGE" "$PDF_PATH" "$OUTPUT_DIR/page"

echo "Running pdftotext..."
pdftotext -f "$START_PAGE" -l "$END_PAGE" "$PDF_PATH" "$OUTPUT_DIR/pages_${START_PAGE}_${END_PAGE}.txt"

echo "Extraction complete into $OUTPUT_DIR"
