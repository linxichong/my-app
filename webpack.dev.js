const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const path = require('path');

module.exports = merge(common, {
    // 标识配置为开发用
    mode: 'development',
    // 控制是否生成，以及如何生成 source map
    devtool: 'cheap-module-eval-source-map',
    // 管理开发服务器
    devServer: {
        // 查找文件路径
        contentBase: 'dist',
        // 启用 HMR
        hot: true,
    },
    plugins: [
        // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        new webpack.NamedModulesPlugin(),
        // 启用 HMR 热更新，建议用于开发环境
        new webpack.HotModuleReplacementPlugin()
    ],
    // 管理输出
    output: {
        // 定义输出文件名规则
        filename: '[name].bundle.js',
        // 定义输出文件名路径
        path: path.resolve(__dirname, 'dist'),
    },
})