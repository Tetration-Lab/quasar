module.exports = {
  experiments: {
    outputModule: true,
    asyncWebAssembly: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  entry: {
    sv: "./sv.ts",
    inpage: "./inpage.ts",
    inject: "./inject.ts",
  },
  output: {
    filename: "[name].js",
    enabledLibraryTypes: ["module"],
    libraryTarget: "module",
    chunkFormat: "module",
  },
  target: "webworker",
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply ts-loader for .ts files
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
