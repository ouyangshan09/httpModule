/**
 * 开发模式配置
 * @author Ouyang
 * */
const webpack = require('webpack');
const Server = require('webpack-dev-server');
const webpackMerge = require('webpack-merge');
const defaultConfig = require('./webpack.default');

const serverConfig = webpackMerge(defaultConfig, {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});

const server = new Server(webpack(serverConfig), {
    historyApiFallback: true,
    compress: true,
    hot: true,
    publicPath: '/',
    stats: {
        colors: true,
        cached: true
    }
});

server.listen(80, '127.0.0.1', () => {
    console.log('js-starter is running');
});
