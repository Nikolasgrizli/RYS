const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const webpack = require("webpack");
const webpackConfiguration = require("./webpack.config");

module.exports = merge(webpackConfiguration, {
  mode: "production",
  devtool: false,
  target: "browserslist",
  module: {
    rules: [],
  },
  plugins: [

    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(false),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                ["svgo", { removeViewBox: false }],
            ],
          },
        },
      }),
    ],
  },
  performance: {
    hints: false, // отключить предупреждения
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
