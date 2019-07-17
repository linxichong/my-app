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
  },
  // 管理插件，通过插件实现增强功能
  plugins: [
    // 自动清理dist
    new CleanWebpackPlugin(),
    // 生成清单目录
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      generate: (seed, files) => {
        const manifestFiles = files.reduce(function (manifest, file) {
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
          // 抽取出来文件的名字，默认为 true，表示自动生成文件名
          name: "vendor",
          // 表示从所有chunks里面抽取代码, 可选值为initial、async、all，也可以自定义函数
          chunks: "all",
          // 表示要过滤 modules, 这里限制为 node_modules
          test: /node_modules/,
          // 表示抽取权重，数字越大表示优先级越高。
          priority: 20,
          // 表示是否使用已有的 chunk,如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的
          reuseExistingChunk: true
        },
        commons: {
          // 抽取出来文件的名字，默认为 true，表示自动生成文件名
          name: "commons",
          // 从初始chunks里面抽取代码
          chunks: "initial",
          // 表示被引用次数，默认为1
          minChunks: 2,
          // 表示抽取出来的文件在压缩前的最小大小
          minSize: 0,
          // 表示是否使用已有的 chunk,如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的
          reuseExistingChunk: true
        }
      }
    },
    // manifest分割配置
    runtimeChunk: true
  }
};
