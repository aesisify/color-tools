![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/aesisify/color-tools/deploy.yml?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/aesisify/color-tools?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/aesisify/color-tools?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/aesisify/color-tools?style=flat-square)

# Color Tools

This is a web application built with Vue that generates color ramps. It allows
users to generate color ramps based on a base color, with options for number of
colors, saturation and brightness ranges, and hue shifts.

Uses [chroma-js](https://github.com/gka/chroma.js/) and
[color-names](https://github.com/meodai/color-names).

## Usage

To use the application, simply visit the
[website](https://aesisify.github.io/color-tools/#/ramp-gen) or clone this
repository and check the installation guide below.

## Installation

To install this application locally after cloning the repository:

```bash
npm install
npm run dev
```

## Todo

- Save system for generated palettes.
- Integrate [color-thief](https://github.com/lokesh/color-thief) for palette
  extraction from images.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please
fork the repository and submit a pull request.
