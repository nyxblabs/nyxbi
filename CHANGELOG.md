# Changelog


## v0.0.5

[compare changes](https://github.com/nyxblabs/nyxbi/compare/v0.0.4...v0.0.5)


### 🏡 Chore

  - **cli.ts): remove showBanner function call from _main function 🐛 fix(add.ts): update console message to reflect correct functionality for the 'page' template 🔥 chore(banner.ts): remove unused showBanner function 🐛 fix(help.ts:** Update command name in help message from 'nuxi' to 'nyxbi' The showBanner function was removed as it was unused. The showBanner function call was removed from the _main function as it was not necessary. The console message in the add.ts file was updated to reflect the correct functionality for the 'page' template. The command name in the help message in the help.ts file was updated from 'nuxi' to 'nyxbi'. ([7bb244e](https://github.com/nyxblabs/nyxbi/commit/7bb244e))
  - **karium.config.ts:** Remove unnecessary externals from build configuration The externals array contained several unnecessary entries that were not being used in the build process. These entries were removed to simplify the build configuration and reduce the size of the final build. ([5d23241](https://github.com/nyxblabs/nyxbi/commit/5d23241))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

## v0.0.4

[compare changes](https://github.com/nyxblabs/nyxbi/compare/v0.0.3...v0.0.4)

## v0.0.3

[compare changes](https://github.com/nyxblabs/nyxbi/compare/v0.0.2...v0.0.3)


### 🩹 Fixes

  - **run.ts:** Rename NuxtCommand to NyxbCommand to reflect project name change The NuxtCommand interface was renamed to NyxbCommand to reflect the project's name change. This commit updates the import statement and the type casting accordingly. ([335ce00](https://github.com/nyxblabs/nyxbi/commit/335ce00))
  - **add.ts:** Correct typo in usage command from nuxi to nyxbi The usage command for the add command was incorrectly spelled as "nuxi" instead of "nyxbi". This commit fixes the typo to ensure that the correct command is used. ([97c6830](https://github.com/nyxblabs/nyxbi/commit/97c6830))

### 🏡 Chore

  - **package.json:** Rename cli binary from nuxi to nyxbi The cli binary name was changed from nuxi to nyxbi to avoid conflicts with other packages and to improve the uniqueness of the package name. ([0262867](https://github.com/nyxblabs/nyxbi/commit/0262867))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

## v0.0.2

