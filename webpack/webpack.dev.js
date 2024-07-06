const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

const common = require("./webpack.common");

const paths = require("./constants/paths");
const regex = require("./constants/regex");
const server = require("./constants/server");

module.exports = webpackMerge.merge(common, {
  devServer: {
    static: paths.build,
    port: server.port,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: regex.scss,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
});
