const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const paths = require("./constants/paths");
const regex = require("./constants/regex");

const mode = process.env.NODE_ENV;

const env = {
  NODE_ENV: mode,
  ...dotenv.config({ path: [`.env.${mode}.local`, `.env.${mode}`] }).parsed,
};

module.exports = {
  entry: path.join(paths.src, "index.tsx"),
  target: "web",
  mode,
  module: {
    rules: [
      {
        test: regex.tsx,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "static/js/[name].[contenthash].js",
    path: paths.build,
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.public,
          to: paths.build,
          globOptions: {
            ignore: ["**/index.html"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.public, "index.html"),
    }),
  ],
};
