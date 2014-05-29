![logo](http://i1279.photobucket.com/albums/y523/textcraft/May%202014%20-%204/5613fe85b14bfba8852c66a86088e4f28b21c76b2f26e018ee7d466a4e995762f3d3a91a2bf15498da39a3ee5e6b4b0d3255bfef95601890afd80709592f4dc7ad197f730ed6_zpse5ff3970.png)

Paker is a Minecraft modpack manager for the Command Line.
Paker will maintain your library of mods, and help link them to various mod packs.  This makes releasing your custom mod packs easy.

Paker releases are in SKlauncher format.  I recommend the [CraftBoot launcher](https://github.com/oxguy3/craftboot) since it is prebuilt.

NOTICE: Paker is not ready for public use. This notice will be removed as soon as it is functional.

## Installation
Paker can be installed via npm: 
```
npm install -g paker
```

To use paker:
```
paker

Usage: node paker <command>

command     
  init             Start a new library in an empty directory.
  newPak           Generate a new modpack.
  editPak          Generate a new modpack.
  makeRelease      Release the modpak.  This will auto increment the version number
  makeDev          Release Test version of the package.  Useful for testing a modpak will download correctly before releasing to your users.
  addMod           Add a new mod to the library.
  addForgeless     Add a new mod to the library.

```
