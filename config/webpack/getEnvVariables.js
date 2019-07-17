const fs = require("fs");

const getEnvVariables = webpackEnv => {
  // 默认仅加载 .env.production | .env.development | .env.test格式的变量定义文件
  const dotenvFiles = [`.env.${webpackEnv}`].filter(Boolean);
  // 将计算机自身和自定义变量加载到nodejs环境中
  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      require("dotenv-expand")(
        require("dotenv").config({
          path: dotenvFile
        })
      );
    }
  });

  // 假定应用程序中所使用的环境变量都是以 APP_ 开头
  const VAR_PREFIX = /^APP_/i;
  // 生成需要注入的变量
  const raw = Object.keys(process.env)
    .filter(key => VAR_PREFIX.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // 增加环境变量
        NODE_ENV: webpackEnv
      }
    );
  // 需要注入的变量字符串化
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };

  return { raw, stringified };
};

module.exports = getEnvVariables;
