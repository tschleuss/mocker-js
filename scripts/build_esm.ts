import { buildSync } from "esbuild";
import { sync as globSync } from "glob";

export const emsBuild = () => {
  console.log("Building dist for node type=module (esm)...");

  buildSync({
    entryPoints: globSync("./src/index.ts"),
    outdir: "./dist/esm",
    bundle: true,
    sourcemap: false,
    minify: true,
    splitting: true,
    format: "esm",
    target: "node14",
    outExtension: { ".js": ".mjs" },
  });
};
