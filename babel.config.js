const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                "browsers": ["last 2 versions", "> 0.2%", "maintained node versions", "not dead"],
            },
            // 配置如何处理 polyfills
            // "usage" | "entry" | false, defaults to false.
            // usage 目前是个实验性的用法，在具体使用的文件中导入具体被使用的polyfills
            useBuiltIns: "usage",
            // 指定corejs版本为2.x
            corejs: 2,
        },
    ],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
];

const plugins = [
    ["@babel/plugin-syntax-dynamic-import"],
    ["@babel/plugin-proposal-class-properties"]
]

module.exports = {
    presets,
    plugins
};