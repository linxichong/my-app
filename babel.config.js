const getPresets = env => {
    const isEnvDevelopment = env === 'development';
    const isEnvTest = env === 'test';

    return [
        [
            "@babel/preset-env",
            !isEnvTest ?
                // 开发，产品环境
                {
                    // 配置如何处理 polyfills
                    // "usage" | "entry" | false, defaults to false.
                    // usage 目前是个实验性的用法，在具体使用的文件中导入具体被使用的polyfills
                    useBuiltIns: "usage",
                    // 指定corejs版本为2.x
                    corejs: 2,
                    // 指定ES6模块转换类型，false为不转换
                    modules: false,
                    // 排除@babel/plugin-transform-typeof-symbol插件
                    exclude: ['transform-typeof-symbol'],
                } :
                // 测试环境
                {
                    targets: {
                        node: 'current',
                    },
                },
        ],
        [
            "@babel/preset-react",
            {
                // 开启利于开发环境的插件，例如@babel/plugin-transform-react-jsx-self和@babel/plugin-transform-react-jsx-source。
                development: isEnvDevelopment || isEnvTest,
                // 将使用本机内置而不是尝试对任何需要的插件进行polyfill行为.
                useBuiltIns: true,
            },
        ],
        ["@babel/preset-typescript"]
    ];
}

const getPlugins = () => {
    return [
        // 开启实验性的babel宏插件，宏插件使用是免配置，对应包需要安装到开发环境依赖中
        ['babel-plugin-macros'],
        // 支持装饰器
        ['@babel/plugin-proposal-decorators', false],
        // 支持import()
        ["@babel/plugin-syntax-dynamic-import"],
        // 类属性
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ];
};

module.exports = function (api) {
    // 基于NODE_ENV执行缓存，如果NODE_ENV发生变化，则重新获取配置更新缓存
    api.cache.using(() => process.env.NODE_ENV);

    return {
        presets: getPresets(process.env.NODE_ENV),
        plugins: getPlugins()
    };
};