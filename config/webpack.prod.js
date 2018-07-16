/**
 * 生产环境配置
 * @author Ouyang
 * */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const defaultConfig = require('./webpack.default');
const config = require('./config');
const rm = require('rimraf');
const ora = require('ora');
const chalk = require('chalk');

const spinner = ora('building for production...');
spinner.start();

const prodConfig = webpackMerge(defaultConfig, {
    output: {
        publicPath: '/',
        path: config.dist,
        filename: '[name].[hash].js'
    },
    mode: 'production'
});

rm(config.dist, err => {
    if (err) throw err;
    webpack(prodConfig, (err, status) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(status.toString({
            colors: true,
            modules: true,
            children: true,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        if (status.hasErrors()) {
            console.log(chalk.red('Build failed with errors. \n'));
            process.exit(1);
        }

        console.log(chalk.cyan('Build complete \n'));
        console.log(chalk.yellow('Open index.html'));
    });
});
