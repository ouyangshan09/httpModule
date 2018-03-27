/**
 * 开发模式配置
 * @author Ouyang
 * */
const webpack = require('webpack');
const Server = require('webpack-dev-server');
const webpackMerge = require('webpack-merge');
const defaultConfig = require('./webpack.default');
const config = require('./config');
const opn = require('opn');
const url = require('url');

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

server.listen(config.port, config.host, () => {
    console.log('js-starter is running');
    opn(url.format({
        protocol: config.protocol,
        port: config.port,
        host: config.host
    }))
});
