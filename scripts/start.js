const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('../config/webpack.config');
// env mode
config.mode = 'development';

// HMR
const HOST = 'localhost';
const PORT = 5000;
const formatUrl = `http://${HOST}:${PORT}/`
config['entry'].unshift(`webpack-dev-server/client?${formatUrl}`, 'webpack/hot/dev-server');
config['plugins'].unshift(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);

const serverConfig = {
    historyApiFallback: true,
    compress: true,
    stats: {
        colors: true
    },
    contentBase: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../example')],
    watchContentBase: true,
    hot: true,
    host: 'localhost',
    publicPath: '/',
    before(app) {
    }
}

const devServer = new webpackDevServer(compiler, serverConfig);

devServer.listen(PORT, HOST, err => {
    if (err) {
        return console.log(err);
    }
    console.log('Starting the development server...\n');
});
