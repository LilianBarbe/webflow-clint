require("esbuild")
  .build({
    entryPoints: ["src/services.js"],
    outfile: "dist/services.js",
    bundle: true,
    minify: true,
    sourcemap: true,
  })
  .catch(() => process.exit(1));
