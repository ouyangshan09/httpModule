/**
 * webpack默认配置
 * */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');
const fs = require('fs');

const babelConfig = fs.readFileSync(path.join(config.root, '.babelrc'));
const babelOption = JSON.parse(babelConfig);

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|lib)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOption
                }
            },
            {
                test: /\.s?([ca])ss$/,
                exclude: [
                    path.join(config.root, 'public'),
                    path.join(config.root, 'node_modules')
                ],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader', options: {limit: 8192} }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: config.root,
            manifest: require(path.join(config.root, 'lib/vendor-manifest.json'))
        }),
        new HtmlWebpackPlugin({
            template: path.join(config.src, 'index.html'),
            title: 'js-starter'
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            ignoreOrder: true,
            allChunks: true
        })
    ]
};
