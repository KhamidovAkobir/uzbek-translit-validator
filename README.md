# uzbek-translit-validator

A lightweight, zero-dependency JavaScript/Node.js library designed for accurate Uzbek Latin-to-Cyrillic (and vice versa) transliteration and national format validations (Uzbek mobile carrier codes, 14-digit PINFL/JSHSHIR, and 9-digit TIN/STIR).

## Why this library?
Standard transliteration libraries frequently fail on Uzbek compound digraphs (O', G', Sh, Ch) and different Unicode apostrophe variations. This package normalizes apostrophes and handles state-standard conversion rules out of the box.

## Features
- **Bi-directional Transliteration:** Convert seamlessly between Uzbek Latin and Cyrillic scripts.
- **Phone Number Validator:** Validates all active Uzbekistan mobile operators (+998).
- **PINFL & TIN Validation:** Fast verification for government and fintech integrations.
- **Zero Dependencies:** Tiny footprint, safe for both Node.js backends and frontend bundles.

## License
MIT
