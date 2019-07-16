const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getModuleRules = require("./config/webpack/getModuleRules");
const getEnvVariables = require("./config/webpack/getEnvVariables");
// 开发环境
const webpackDev = "development";
// 定义模块解析规则
const rules = getModuleRules(webpackDev);
// 获取环境变量定义
const env = getEnvVariables(webpackDev);

console.log(env.stringified);

module.exports = merge(common, {
  // 标识配置为开发用
  mode: webpackDev,
  // 控制是否生成，以及如何生成 source map
  devtool: "cheap-module-source-map",
  // 管理开发服务器
  devServer: {
    // 开启服务器路由支持，默认定位根目录index.html
    historyApiFallback: true,
    // 查找文件路径
    contentBase: "dist",
    // 启用 HMR
    hot: true
  },
  plugins: [
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
    new webpack.NamedModulesPlugin(),
    // 启用 HMR 热更新，建议用于开发环境
    new webpack.HotModuleReplacementPlugin(),
    // 预设程序执行环境
    new webpack.DefinePlugin(env.stringified),
    // 根据模板生成html
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./src/index.html"
    })
  ],
  // 管理输出
  output: {
    // 定义输出文件名规则
    filename: "static/js/bundle.js",
    // 定义非入口(non-entry) chunk 文件的名称
    chunkFilename: "static/js/[name].chunk.js",
    // 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释
    pathinfo: true
  },
  // 配置项目处理的不同文件及模块
  module: {
    // 配置项目处理模块规则
    rules: [
      {
        oneOf: rules
      }
    ]
  }
});
