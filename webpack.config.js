const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web': 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    return {
        mode,
        target,
        devtool,
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
            new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
          ],
        module: {
          rules: [
            {
              test: /\.html$/i,
              loader: 'html-loader',
            },
            {
              test: /\.svg$/,
              use: "file-loader",
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