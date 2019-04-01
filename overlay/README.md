# Demo Integration Project

**This is a demo project and just serves as an idea on how to setup an integration.**


## Building and Testing
Install dependencies using `npm install` and run `npm run build` to build files in `dist/` directory.

To test your page, run a simple local http server in this directory (e.g. `python3 -m http.server 2080`) and open
it at http://localhost:2080/.

## Zig Client
The zig client is included as a dependency in the `package.json` as `zig-js`.
For more information on the zig client, checkout the package documentation
on [npm](https://www.npmjs.com/package/zig-js).

## Overlay
This example uses a very simple custom overlay integration. Have a look at the
`overlay.js` file. For a more complete integration, see the `overlay.ts` in the zig client
library.
