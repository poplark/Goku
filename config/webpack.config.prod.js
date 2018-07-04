const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const rootPath = path.resolve(__dirname, '../');

const extractTextPluginOptions = {};

module.exports = function(minify) {
    return {
        entry: [
            path.resolve(rootPath, 'src/index.jsx')
        ],
        output: {
            path: path.resolve(rootPath, 'lib'),
            filename: minify ? 'goku.min.js' : 'goku.js',
            // chunkFilename: '[name].[chunkhash:8].chunk.js',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.json', '.jsx'],
            // alias: {
            //     'goku': path.resolve(rootPath, 'src'),
            // } ,
        },
        externals: [
            {
                '@antv/g2'      : 'umd @antv/g2',
                'bulma'         : 'umd bulma',
                'omit.js'       : 'umd omit.js',
                'prop-types'    : 'umd prop-types',
                'react'         : 'umd react',
                'react-dom'     : 'umd react-dom',
                'unique-classnames': 'umd unique-classnames',
            }
        ],
        devtool: minify ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.(js|jsx|mjs)$/,
                    enforce: 'pre',
                    loader: require.resolve('eslint-loader'),
                    include: [path.resolve(rootPath, 'src')],
                    options: {
                        eslintPath: require.resolve('eslint'),
                        configFile: path.resolve(rootPath, '.eslintrc')
                    }
                }, {
                    oneOf: [
                        {
                            test: /.jsx?$/,
                            loader: require.resolve('babel-loader'),
                            include: [path.resolve(rootPath, 'src')],
                        }, {
                            test: /.(css|less)$/,
                            loader: ExtractTextPlugin.extract(
                                Object.assign(
                                    {
                                        fallback: {
                                            loader: require.resolve('style-loader'),
                                            options: {
                                                hmr: false,
                                            },
                                        },
                                        use: [
                                            {
                                                loader: require.resolve('css-loader'),
                                                options: {
                                                    importLoaders: 1,
                                                    minimize: !!minify,
                                                    sourceMap: !!minify,
                                                },
                                            }, {
                                                loader: require.resolve('postcss-loader'),
                                                options: {
                                                    // Necessary for external CSS imports to work
                                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                                    ident: 'postcss',
                                                    plugins: () => [
                                                        require('postcss-flexbugs-fixes'),
                                                        autoprefixer({
                                                            browsers: [
                                                                '>1%',
                                                                'last 4 versions',
                                                                'Firefox ESR',
                                                                'not ie < 9', // React doesn't support IE8 anyway
                                                            ],
                                                            flexbox: 'no-2009',
                                                        }),
                                                    ],
                                                },
                                            }, {
                                                loader: require.resolve('less-loader')
                                            }
                                        ]
                                    },
                                    extractTextPluginOptions
                                )
                            )
                        }, {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.js$/, /\.html$/, /\.json$/],
                        }
                    ]
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: minify ? 'goku.min.css' : 'goku.css',
            }),
        ]
    }
}