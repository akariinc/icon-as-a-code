# Akari Icon as a Code

Akari's logo icon as a code.

This repository include Logo Generator Controls, SVG exporter and Logo class in vanilla javascript.

With which you can check a logo mark's shape and color variants, export it as SVG, or use the javascript class with animations options on UI.

## The original logo and mark

This is our currnet full logo.

![akari_logo](https://github.com/user-attachments/assets/81983055-e369-4ea1-b8e2-657933d07948)

This is small version of logo mark. Used for icon.

![akari_logo_a](https://github.com/user-attachments/assets/7f8610fd-bc2b-4483-bf0a-63565eabe272)


## Features

- ESM modules
- IIFE bundle for direct browser support without bundler
- Typings bundle

- ESLint - scripts linter
- Stylelint - styles linter
- Prettier - formatter
- Vitest - test framework
- Husky + lint-staged - pre-commit git hook set up for formatting

## GitHub Template

This is a template repo. Click the green [Use this template](https://github.com/akariinc/icon-as-a-code/generate) button to get started.

## Clone to local

If you prefer to do it manually with the cleaner git history

```bash
git clone https://github.com/akariinc/icon-as-a-code.git
cd icon-as-a-code
npm i
```

## Checklist

When you use this template, update the following:

- Remove `.git` directory and run `git init` to clean up the history
- Change the name in `package.json` - it will be the name of the IIFE bundle global variable and bundle files name (`.cjs`, `.mjs`, `.iife.js`, `d.ts`)
- Change the author name in `LICENSE`
- Clean up the `README` and `CHANGELOG` files

And, enjoy :)

## Usage

The starter contains the following scripts:

- `dev` - starts dev server
- `build` - generates the following bundles: ESM (`.js`) and IIFE (`.iife.js`). The name of bundle is automatically taken from `package.json` name property
- `docs` - build doc using `typedoc`
- `test` - starts vitest and runs all tests
- `test:coverage` - starts vitest and run all tests with code coverage report
- `lint:scripts` - lint `.ts` files with eslint
- `lint:styles` - lint `.css` and `.scss` files with stylelint
- `format:scripts` - format `.ts`, `.html` and `.json` files with prettier
- `format:styles` - format `.cs` and `.scss` files with stylelint
- `format` - format all with prettier and stylelint
- `prepare` - script for setting up husky pre-commit hook
- `uninstall-husky` - script for removing husky from repository
