const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getModuleRules = require("./config/webpack/getModuleRules");
const getEnvVariables = require("./config/webpack/getEnvVariables");
// 生产环境
const webpackDev = "production";
// 定义模块解析规则
const rules = getModuleRules(webpackDev);
// 获取环境变量定义
const env = getEnvVariables(webpackDev);

module.exports = merge(common, {
  // 标识配置为生产用
  mode: webpackDev,
  // 编译遇到错误立即终止打包过程
  bail: true,
  // 控制是否生成，以及如何生成 source map
  devtool: false,
  plugins: [
    // 预设程序执行环境
    new webpack.DefinePlugin(env.stringified),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
    }),
    // 根据模板生成html
    new HtmlWebpackPlugin({
      title: "My App",
      template: "./src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  // 管理输出
  output: {
    // 定义输出文件名规则
    filename: "static/js/[name].[contenthash:8].js",
    // 定义非入口(non-entry) chunk 文件的名称
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js"
  },
  // 代码分割配置
  optimization: {
    // 启用js代码压缩，生产环境默认为true
    minimize: true,
    // 指定自定义压缩插件
    minimizer: [
      // Terser配置
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        // 开启多线程，加快编译速度
        parallel: true,
        // 开启文件缓存
        cache: true,
        // 关闭sourceMap
        sourceMap: false
      }),
      // 优化及压缩CSS
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: false
        }
      })
    ]
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
