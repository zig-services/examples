#!/bin/sh

set -e

npm install
npm run build

# clean target directory
rm -rf dist/zig-demo-game
mkdir -p dist/zig-demo-game

cp -ra src .gitignore *.html *.json README.md dist/zig-demo-game
cd dist
tar -c zig-demo-game | gzip -9 > zig-demo-game.tar.gz
