const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require("beautify-html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const ImageminAvifWebpackPlugin= require("imagemin-avif-webpack-plugin");
const paths = require("./paths");

const isDev = process.env.NODE_ENV === "development";
const PAGES_DIR = path.resolve(paths.source, "pug");
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".pug"));



module.exports = {
  entry: {
    main: path.resolve(paths.source, "./js/index.js"),
  },

  optimization: {
    splitChunks: {
      name: "vendors",
      chunks: "all",
    },
  },

  output: {
    path: paths.output,
    filename: "assets/js/[name].js",
    // clean: true,
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: isDev
          ? ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
          : [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/inline",
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-sprite-loader',
        options: {}
      },
    ],
  },





  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(paths.source, "./pug/index.pug"),
    //   // filename: './templates/index.html',
    //   filename: "./index.html",
    //   inject: "body",
    // }),

    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`,
        inject: page.includes('index') ? false : "body",
      // inject: false
    })),

    new BeautifyHtmlWebpackPlugin({
      indent_size: 2,
      indent_with_tabs: false,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.source, "assets"),
          to: path.resolve(paths.output, "assets"),
        },
      ],
    }),

    new SpriteLoaderPlugin({
        plainSprite: true
    }),

    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),

  ],

  optimization: {
    minimize: true,
    minimizer: [

      new ImageminWebpWebpackPlugin({
          detailedLogs: true,
          overrideExtension: true,
          config: [{
              test: /img\/.*\.(jpe?g|png|gif)/,
              exclude: /assets\/favicon/,
              options: {
                  quality: 85
              }
          }],
      }),
      new ImageminAvifWebpackPlugin({
          detailedLogs: true,
          overrideExtension: true,
          config: [{
              test: /img\/.*\.(jpe?g|png|gif)/,
              exclude: /assets\/favicon/,
              options: {
                  quality: 75
              }
          }],
      })
    ]
  },
};
