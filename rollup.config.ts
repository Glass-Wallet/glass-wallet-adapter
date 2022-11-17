import resolvePlugin from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import cjs2es from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { defineConfig } from 'rollup';
import {getBabelOutputPlugin} from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import * as path from 'path';

const config = defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      plugins: [
        getBabelOutputPlugin({
          filename: "dist/index.js",
          configFile: path.resolve(__dirname, "babel.config.js"),
        }),
      ],
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  external: ["@mysten/sui.js"],
  plugins: [
    typescript({ target: "es5" }),
    nodePolyfills(),
    resolvePlugin({
      browser: true, // specify that it's built for browser
    }),
    cjs2es(),
  ],
});

if (process.env.NODE_ENV === 'production') {
  config.plugins?.push(terser()); // minify output files
}

export default config;
