/**
 * 发布模块到Npm的编译配置
 * @author Ouyang
 * @version 1.0
*/

const webpack = require('webpack');
const config = require('./config');
const rm = require('rimraf');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path');

const spinner = ora('building for production...');
spinner.start();

const babelConfig = fs.readFileSync(path.join(config.root, '.babelrc'));
const babelOption = JSON.parse(babelConfig);

const NPMConfig = {
    entry: {
        index: path.join(config.src, 'http', 'index.js')
    },
    output: {
        publicPath: '/',
        path: config.dist,
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|lib)/,
                use: {
                    loader: 'babel-loader',
                    options: babelOption
                }
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: config.root,
            manifest: require(path.join(config.root, 'lib/vendor-manifest.json'))
        }),
    ],
    mode: 'production'
};

rm(config.dist, err => {
    if (err) throw err;
    webpack(NPMConfig, (err, status) => {
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
    })
})
