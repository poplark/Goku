const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const rootPath = path.resolve(__dirname, '../'),
    examplePath = path.resolve(rootPath, 'example');

module.exports = {
    entry: [
        path.resolve(examplePath, 'js/index.jsx')
    ],
    output: {
        path: path.resolve(rootPath, 'dist'),
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            'goku': path.resolve(rootPath, 'src/index.jsx'),
        } ,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                loader: require.resolve('eslint-loader'),
                include: [path.resolve(rootPath, 'src'), path.resolve(examplePath, 'example/js')],
                options: {
                    eslintPath: require.resolve('eslint'),
                    configFile: path.resolve(rootPath, '.eslintrc')
                }
            }, {
                oneOf: [
                    {
                        test: /\.ejs$/,
                        use: [
                            {
                                loader: require.resolve('ejs-loader'),
                                options: {
                                    // variable: 'website',
                                }
                            },
                        ]
                    }, {
                        test: /.jsx?$/,
                        loader: require.resolve('babel-loader'),
                    }, {
                        test: /.(css|less)$/,
                        use: [
                            {
                                loader: require.resolve('style-loader')
                            }, {
                                loader: require.resolve('css-loader')
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
                    }, {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(examplePath, 'index.ejs'),
            website: {
                title: 'Goku Example',
                description: 'Goku library of react with its\' styles'
            }
        }),
    ]
}