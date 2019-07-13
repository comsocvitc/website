const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");

module.exports = {
  mode: "development",

  entry: ["./src/main.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
    }),
    new HtmlWebpackPugPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: "pug-loader",
      },
    ],
  },

  devServer: {
    port: 3000,
  },
};
