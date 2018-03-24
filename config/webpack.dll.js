/**
 * 第三方移依赖库打包
 * */
const webpack = require('webpack');
const path = require('path');

const root = path.join(__dirname, '../');

module.exports = {
    entry: {
        vendor: ['lodash', 'moment']
    },
    output: {
        path: path.join(root, 'lib'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            context: root,
            path: path.join(root, 'lib/[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};
