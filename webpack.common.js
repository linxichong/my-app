const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    // 入口文件
    entry: './src/index.tsx',
    // 需要解析的文件后缀名
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    // 管理插件，通过插件实现增强功能
    plugins: [
        // 自动清理dist
        new CleanWebpackPlugin(),
        // 根据模板生成html
        new HtmlWebpackPlugin({
            title: 'My App',
            template: './src/index.html'
        }),
    ],
    // 配置项目处理的不同文件及模块
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                enforce: 'pre',
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                loader: 'eslint-loader',
            },
        ]
    }
};