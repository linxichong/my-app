const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  // 入口文件
  entry: "./src/index.tsx",
  // 需要解析的文件后缀名
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    plugins: []
  },
  resolveLoader: {},
  // 管理插件，通过插件实现增强功能
  plugins: [
    // 自动清理dist
    new CleanWebpackPlugin(),
    // 生成清单目录
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      generate: (seed, files) => {
        const manifestFiles = files.reduce(function(manifest, file) {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        return {
          files: manifestFiles
        };
      }
    }),
    // 忽略moment 2.18的本地化内容
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  // 配置项目处理的不同文件及模块
  module: {
    // 使缺少的导出出现错误而不是警告
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        enforce: "pre",
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
        loader: "eslint-loader"
      }
    ]
  },
  // 管理输出
  output: {
    // 定义输出文件名路径
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  optimization: {
    // 代码块分割配置
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "all",
          test: /node_modules/,
          priority: 20,
          reuseExistingChunk: true
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          minSize: 0,
          reuseExistingChunk: true
        }
      }
    },
    // manifest分割配置
    runtimeChunk: true
  },
  // 开启 bundle 文件大小警告
  performance: true
};
