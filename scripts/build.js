const webpack = require('webpack');

let config;
if(process.env.MINIFY) {
    config = require('../config/webpack.config.prod')(true);
    config['mode'] = 'production';
} else {
    config = require('../config/webpack.config.prod')(false);
    config['mode'] = 'none';
}

const webpackBuild = (config) => {
    let compiler = webpack(config);
    compiler.run((err, stats) => {
        if(err) {
            return console.error(err);
        }
        if(stats.compilation.errors.length > 0) {
            return console.error(stats.compilation.errors);
        }
        console.log(stats.toString({colors: true}));
    });
}

webpackBuild(config);