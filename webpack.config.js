'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const manifest = require('./src/manifest.json');

module.exports = (env, argv) => {

    const devMode = argv.mode !== 'production';

    let webpackConfig = {

        entry: {
            'index': './src/index.js'
        },

        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                ...manifest,
                chunks : ['index'],
                template: './src/index.html',
                filename: 'index.html'
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: 'src/manifest.json',
                        to: 'manifest.json'
                    },
                    {
                        from: 'src/assets/favicon.ico',
                        to: 'favicon.ico'
                    },
                    {
                        from: 'src/assets/icon.png',
                        to: 'icon.png'
                    }
                ]
            })
        ],

        devServer: {
            contentBase: "./public",
            host: "0.0.0.0",
            port: 3000
        }
    }

    if (!devMode) {
        // TODO: add service worker here
    }

    return webpackConfig;
};
