const webpackConfig = require('./webpack.config');
const config = require('./config.json');

module.exports = Object.assign({},
    webpackConfig, {
    devServer: {
        port: config.devServer.port,
        historyApiFallback: true
    }
});
