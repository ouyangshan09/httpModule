/**
 * webpack默认配置
 * */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'postcss-loader'},
                        {loader: 'sass-loader'}
                    ],
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
        })
    ]
};
