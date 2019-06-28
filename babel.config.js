const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                "browsers": ["last 2 versions", "> 0.2%", "maintained node versions", "not dead"],
            },
            useBuiltIns: "usage",
            corejs: 2
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