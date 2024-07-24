const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web': 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PugPlugin = require('pug-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, ''),
  },
  entry: {
    // define Pug files in entry:
    index: './src/pages/starting-page/starting-page.pug',
    uiKit: './src/pages/ui-kit/ui-kit.pug',
    colorsAndType: './src/pages/colors-and-type/colors-and-type.pug',
    formElements: './src/pages/form-elements/form-elements.pug',
    headersAndFooters: './src/pages/headers-and-footers/headers-and-footers.pug',
    cards: './src/pages/cards/cards.pug'
    // ...
  },

  plugins: [
    new PugPlugin({
      entry: '.src/pages/',
      js: {
        // JS output filename, used if `inline` option is false (defaults)
        filename: 'js/[name].[contenthash:8].js',
        //inline: true, // inlines JS into HTML
      },
      css: {
        // CSS output filename, used if `inline` option is false (defaults)
        filename: 'css/[name].[contenthash:8].css',
        //inline: true, // inlines CSS into HTML
      },
    })
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader, // the Pug loader
      },
      {
        test: /\.(s?css|sass)$/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.(ico|png|jp?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource', 
        generator:{
          filename: 'fonts/[name].[ext]'
        }  
      },
    ],
  },
};