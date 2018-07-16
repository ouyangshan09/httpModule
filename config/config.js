/**
 * 项目配置
 * @author Ouyang
 * */
const path = require('path');

const root = path.join(__dirname, '../');

module.exports = {
    root: root,
    src: path.join(root, 'src'),
    lib: path.join(root, 'lib'),
    dist: path.join(root, 'dist'),
    port: 80,
    protocol: 'http',
    host: 'starter.oy.ecaicn.com'
};
