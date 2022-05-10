import { buildSync } from "esbuild";
import { sync as globSync } from "glob";

export const cjsBuild = () => {
  console.log("Building dist for node (cjs)...");

  buildSync({
    entryPoints: globSync("./src/**/*.ts"),
    outdir: "./dist/cjs",
    bundle: false,
    sourcemap: false,
    minify: true,
    format: "cjs",
    platform: "node",
    target: "node14",
  });
};
