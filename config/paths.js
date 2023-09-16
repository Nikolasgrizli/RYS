const path = require("path");

module.exports = {
  source: path.resolve(__dirname, "../src/"),
  output: path.resolve(__dirname, "../dist/"),
};

// update all dependensis:
// - npx npm-check-updates -u
// - remove node_modules
// - npm or yarn install

// update Browserslist:
// - npx browserslist@latest --update-db

// pug + vue conf
// {
//   test: /\.pug$/,
//   oneOf: [
//     {
//       resourceQuery: /^\?vue/,
//       use: ['pug-plain-loader'],
//     },
//     {
//       use: ['raw-loader', 'pug-plain-loader?pretty=true'],
//     },
//   ],
// },
// {
//   test: /\.vue$/,
//   use: ['vue-loader']
// },

// vue + css
// {
//   test: /\.((c|sa|sc)ss)$/i,
//     use: isDev ? ['vue-style-loader', 'style-loader', 'css-loader?url=false', 'postcss-loader', 'sass-loader'] : [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader']
// },

// vue conf 
// new webpack.DefinePlugin({
//   __VUE_OPTIONS_API__: true,
//   __VUE_PROD_DEVTOOLS__: false
// })