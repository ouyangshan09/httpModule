/**
 * webpack默认配置
 * */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.join(__dirname, '../');

module.exports = {
    module: {
        rules: [
            {
                test: /\.s?([ca])ss$/,
                exclude: [
                    path.join(root, 'public'),
                    path.join(root, 'node_modules')
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
            context: root,
            manifest: require(path.join(root, 'lib/vendor-manifest.json'))
        }),
        new HtmlWebpackPlugin({
            template: path.join(root, 'src', 'index.html'),
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
