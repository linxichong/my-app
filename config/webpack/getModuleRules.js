// 将每个JS中包含的CSS提取为独立文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 允许通过读取browserslist配置来部分加载 normalize.css或sanitize.css
const postcssNormalize = require("postcss-normalize");
const path = require("path");
const fs = require("fs");

// 获取nodejs执行的工作目录
const appDirectory = fs.realpathSync(process.cwd());
// 获取相对于工作目录的相对路径的真实路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// 定义正则匹配
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const getCssRules = webpackEnv => {
  // 是否为开发环境
  const isEnvDevelopment = webpackEnv === "development";
  // 是否为产品环境
  const isEnvProduction = webpackEnv === "production";
  // 启用/禁用 Sourcemap 开发环境启用/产品环境禁用
  const shouldUseSourceMap = isEnvDevelopment ? true : false;
  // 根据环境，获取style相关loader数组
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      // 开发环境使用style-loader
      isEnvDevelopment && require.resolve("style-loader"),
      // 生产环境使用MiniCssExtractPlugin.loader
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader
      },
      // 解释 @import 和 url() ，会 import/require() 后再解析它们，主要用于将 CSS 转换为JS模块
      {
        loader: require.resolve("css-loader"),
        options: cssOptions
      },
      {
        // 启用postcss
        loader: require.resolve("postcss-loader"),
        options: {
          // 解决引用外部css出现的异常
          // https://github.com/facebook/create-react-app/issues/2677
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            // 允许你使用未来的 CSS 特性
            require("postcss-preset-env")({
              // 自动添加前缀
              autoprefixer: {
                flexbox: "no-2009"
              },
              // 填充语法允许使用标准stage3阶段
              stage: 3
            }),
            postcssNormalize()
          ],
          sourceMap: shouldUseSourceMap
        }
      }
    ].filter(Boolean);
    // 添加其他loader sass或less等
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: shouldUseSourceMap
        }
      });
    }
    return loaders;
  };

  return [
    {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: getStyleLoaders({
        // 用于配置css-loader作用于 @import的资源之前有多少个loader
        importLoaders: 1,
        // 是否开启sourceMap
        sourceMap: shouldUseSourceMap
      }),
      sideEffects: true
    },
    {
      test: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: shouldUseSourceMap,
        modules: true
      })
    },
    {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: shouldUseSourceMap
        },
        require.resolve("sass-loader")
      ),
      sideEffects: true
    },
    {
      test: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: shouldUseSourceMap,
          modules: true
        },
        require.resolve("sass-loader")
      )
    }
  ];
};

// 获取完整的模块处理规则
const getModuleRules = webpackEnv => {
  return [
    // 解析图片资源
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve("url-loader"),
      options: {
        limit: 10000,
        name: "static/media/[name].[hash:8].[ext]"
      }
    },
    // babel-loader解析typescript
    {
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      include: resolveApp("src"),
      use: {
        loader: require.resolve("babel-loader")
      }
    },
    // css解析相关loaders
    ...getCssRules(webpackEnv),
    // 其他文件解析
    {
      loader: require.resolve("file-loader"),
      // Exclude `js` files to keep "css" loader working as it injects
      // its runtime that would otherwise be processed through "file" loader.
      // Also exclude `html` and `json` extensions so they get processed
      // by webpacks internal loaders.
      exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
      options: {
        name: "static/media/[name].[hash:8].[ext]"
      }
    }
  ];
};

module.exports = getModuleRules;
