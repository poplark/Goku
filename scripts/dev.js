const webpack = require('webpack');

const config = require('../config/webpack.dev.config');

const webpackBuild = (config) => {
    let compiler = webpack(config);
    compiler.run((err, stats) => {
        if(err) {
            return console.log(err);
        }
        if(stats.compilation.errors.length > 0) {
            return console.error(stats.compilation.errors);
        }
        console.log(stats.hash);
        console.info(`${stats.endTime - stats.startTime} ms`);
    });
}

webpackBuild(config);