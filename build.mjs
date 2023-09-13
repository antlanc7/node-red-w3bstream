import { build } from "esbuild";
import { copy } from "esbuild-plugin-copy";

await build({
  entryPoints: ["src/w3bstream.js"],
  bundle: true,
  sourcemap: true,
  outfile: "dist/w3bstream.js",
  plugins: [
    copy({
      assets: {
        from: ["./src/*.html"],
        to: ["."],
      },
    }),
  ],
});
