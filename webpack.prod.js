const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')

module.exports = merge(common, {
    // 标识配置为生产用
    mode: 'production',
    // 控制是否生成，以及如何生成 source map
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        // 预设程序执行环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    // 管理输出
    output: {
        // 定义输出文件名规则
        filename: '[name].[contenthash].js',
        // 定义输出文件名路径
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/,
                    priority: 20,
                    reuseExistingChunk: true,
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0,
                    reuseExistingChunk: true,
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `manifest.${entrypoint.name}`
        }
    },
})