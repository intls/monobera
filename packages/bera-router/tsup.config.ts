const config = {
  entryPoints: ["src/index.ts"], // The entry point(s) of your library
  // format: ["cjs", "esm"], // The desired output format(s)
  minify: true, // Whether to minify the output
  sourcemap: true, // Whether to generate sourcemaps
  // splitting: true, // Whether to split the bundle into chunks
  dts: true, // Whether to generate TypeScript declaration files
  // target: "node18", // Specify your target environment
};

export default config;