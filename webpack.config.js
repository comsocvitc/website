const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SRC = "src";
const isProd = process.env.NODE_ENV === "production";

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
  mode: isProd ? "production" : "development",

  entry: path.resolve(__dirname, SRC, "js", "index.js"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProd ? "bundle.[hash].js" : "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProd,
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.pug$/,
        use: "pug-loader",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "assets/", to: "static" }], { logLevel: "silent" }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    }),
    ...pugs,
    new HtmlWebpackPugPlugin(),
  ],

  devServer: {
    port: 3000,
    compress: true,
    hot: !isProd,
  },
};
