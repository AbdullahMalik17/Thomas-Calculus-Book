#!/usr/bin/env python3
"""
scripts/extract_pages.py
Python-based PDF page and text extractor for Thomas' Calculus (14th Edition).
Utilizes pypdf for extraction across Windows and cross-platform environments.
"""

import argparse
import os
import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    pypdf = None


def extract_pages(pdf_path: str, start_page: int, end_page: int, out_dir: str):
    if not pypdf:
        print("ERROR: pypdf is not installed. Run 'python -m pip install pypdf'", file=sys.stderr)
        sys.exit(1)

    pdf_file = Path(pdf_path)
    if not pdf_file.exists():
        # Try relative to workspace root if not found
        candidate = Path(__file__).resolve().parent.parent.parent / pdf_file.name
        if candidate.exists():
            pdf_file = candidate
        else:
            print(f"ERROR: PDF file not found at '{pdf_path}' or '{candidate}'", file=sys.stderr)
            sys.exit(1)

    output_path = Path(out_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    print(f"Reading '{pdf_file}'...")
    reader = pypdf.PdfReader(str(pdf_file))
    total_pages = len(reader.pages)
    print(f"Total pages in PDF: {total_pages}")

    # Convert 1-indexed to 0-indexed
    start_idx = max(0, start_page - 1)
    end_idx = min(total_pages, end_page)

    extracted_text = []

    for page_num in range(start_idx, end_idx):
        display_num = page_num + 1
        page = reader.pages[page_num]
        text = page.extract_text() or ""
        extracted_text.append(f"--- PAGE {display_num} ---\n{text}\n")
        print(f"Extracted page {display_num} ({len(text)} characters)")

    out_text_file = output_path / f"pages_{start_page}_{end_page}.txt"
    with open(out_text_file, "w", encoding="utf-8") as f:
        f.writelines(extracted_text)

    print(f"\nSuccessfully wrote extracted text to: {out_text_file}")


def main():
    parser = argparse.ArgumentParser(
        description="Extract page ranges from Thomas' Calculus PDF."
    )
    parser.add_argument(
        "--start", type=int, default=1, help="Starting page number (1-indexed)"
    )
    parser.add_argument(
        "--end", type=int, default=1, help="Ending page number (1-indexed)"
    )
    parser.add_argument(
        "--pdf",
        type=str,
        default="../Thomas-Calculus-14th-Edition-[konkur.in].pdf",
        help="Path to textbook PDF",
    )
    parser.add_argument(
        "--out",
        type=str,
        default="source/extracted",
        help="Output directory for extracted files",
    )

    args = parser.parse_args()
    extract_pages(args.pdf, args.start, args.end, args.out)


if __name__ == "__main__":
    main()
