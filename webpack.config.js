const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const SRC = "src";

/* Dynamically add pug files */

const pugs = [];

const files = fs.readdirSync(path.resolve(__dirname, SRC));

const decideFileStructure = filename =>
  filename === "index" ? filename : `${filename}/index`;

files.forEach(file => {
  if (file.match(/\.pug$/)) {
    let filename = file.substring(0, file.length - 4);

    pugs.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, SRC, file),
        filename: decideFileStructure(filename) + ".html",
      }),
    );
  }
});

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, SRC, "main.js"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: "pug-loader",
      },
    ],
  },

  plugins: [new CleanWebpackPlugin(), ...pugs, new HtmlWebpackPugPlugin()],

  devServer: {
    port: 3000,
    compress: true,
    hot: true,
  },
};
