# Color Helper

This is a web application built with Vue 2.7 that generates color ramps for pixel art projects although these can palettes can be used anywhere. It allows users to generate color ramps based on a base color, with options for number of colors, saturation and brightness ranges, and hue shifts.

Uses [chroma-js](https://github.com/gka/chroma.js/) and [color-names](https://github.com/meodai/color-names).

## Usage

To use the application, simply visit the [live demo](https://aesisify.github.io/color-tools/#/ramp-gen) or clone this repository.

Once the application is loaded, you can select a base color by clicking on the color picker or entering a hex value. Then, adjust the other settings to generate your desired color ramp. Finally, you can copy the colors by clicking on them or copying the output JSON data at the bottom of the page.

## Installation

To install this application locally:

```bash
npm install
npm run dev
```

## Todo

* Save system for generated palettes.
* Integrate [color-thief](https://github.com/lokesh/color-thief) for palette extraction from images.
* A basic homepage?

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.
