const { merge } = require("webpack-merge");
const webpack = require("webpack");
const webpackConfiguration = require("./webpack.config");

module.exports = merge(webpackConfiguration, {
  mode: "development",
  devtool: "inline-source-map",
  target: "web",
  devServer: {
    open: true,
    port: 8080,
	hot: false,
	devMiddleware: {
		writeToDisk: true,
	}
  },

  module: {
    rules: [],
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
    }),
  ],
});
