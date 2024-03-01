const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web': 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PugPlugin = require('pug-plugin');

module.exports = (env) => {
    return {
        mode,
        target,
        devtool,
        mode: env.mode ?? 'development',
        entry: {
          index: 'src/pages/starting-page/starting-page.pug',
          test: 'src/pages/test-page/test-page.pug',
          uikit: 'src/pages/ui-kit/ui-kit.pug'
          //path.resolve(__dirname, 'src', 'index.js'),
        },
        output: {
            path: path.join(__dirname, 'build'),
            publicPath: '/',
            //path: path.resolve(__dirname, 'build'),
            //filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            //new PugPlugin({ template: path.resolve(__dirname, 'src/pages', 'starting-page.pug'), filename: 'index.html' }),
            new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
            new PugPlugin({
              pretty: true, // formatting HTML, useful for development mode
              js: {
                // output filename of extracted JS file from source script
                filename: 'assets/js/[name].[contenthash:8].js',
              },
              css: {
                // output filename of extracted CSS file from source style
                filename: 'assets/css/[name].[contenthash:8].css',
              },
            }),
          ],
        module: {
          rules: [
            /*{
              test: /\.html$/i,
              loader: 'html-loader',
            },*/
            {
              test: /\.(jpe?g|png|gif|svg)$/i, 
              type: 'asset/resource',
              
            },
            { 
                test: /\.pug$/,
                loader: PugPlugin.loader, 
            },
            {
              test: /\.(c|sa|sc)ss$/i,
              use: [
                devMode ? 'style-loader': MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader'
                ],
            },
            {
              test: /\.woff2?$/i,
              type: 'asset/resource', 
              generator:{
                filename: 'fonts/[name].[ext]'
              }
            }
          ]
        }   
    }
}