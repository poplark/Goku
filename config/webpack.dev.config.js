const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../'),
    examplePath = path.resolve(rootPath, 'example');

module.exports = {
    entry: {
        index: path.resolve(examplePath, 'js/index.jsx')
    },
    output: {
        path: path.resolve(rootPath, 'dist'),
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                loader: require.resolve('eslint-loader'),
                options: {
                    eslintPath: require.resolve('eslint'),
                    configFile: path.resolve(rootPath, '.eslintrc')
                }
            }, {
                oneOf: [
                    {
                        test: /.jsx?$/,
                        loader: require.resolve('babel-loader'),
                        options: {
                            compact: true,
                            presets: [
                                'env',
                                'react'
                            ],
                        },
                    }, {
                        test: /.(css|less)$/,
                        use: [
                            {
                                loader: require.resolve('style-loader')
                            }, {
                                loader: require.resolve('css-loader')
                            }, {
                                loader: require.resolve('postcss-loader')
                            }, {
                                loader: require.resolve('less-loader')
                            }
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(examplePath, 'index.html'),
        }),
    ]
}