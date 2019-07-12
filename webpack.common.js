const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    // 入口文件
    entry: './src/index.tsx',
    // 需要解析的文件后缀名
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ['node_modules', path.resolve(__dirname, "src")],
        plugins: [
            // Adds support for installing with Plug'n'Play, leading to faster installs and adding
            // guards against forgotten dependencies and such.
            PnpWebpackPlugin,
        ],
    },
    resolveLoader: {
        plugins: [
            // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
            // from the current package.
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    // 管理插件，通过插件实现增强功能
    plugins: [
        // 自动清理dist
        new CleanWebpackPlugin(),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            generate: (seed, files) => {
                const manifestFiles = files.reduce(function (manifest, file) {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);

                return {
                    files: manifestFiles,
                };
            },
        }),
        // 忽略moment 2.18的本地化内容
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    // 配置项目处理的不同文件及模块
    module: {
        // 使缺少的导出出现错误而不是警告
        strictExportPresence: true,
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            {
                enforce: 'pre',
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                loader: 'eslint-loader',
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                loader: 'file-loader',
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise be processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    // 管理输出
    output: {
        // 定义输出文件名路径
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    optimization: {
        // 代码块分割配置
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        // manifest分割配置
        runtimeChunk: true,
    }
};