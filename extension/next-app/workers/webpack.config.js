module.exports = {
  experiments: {
    outputModule: true,
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
  },
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
