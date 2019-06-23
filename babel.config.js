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
    ["@babel/preset-react"]
];

module.exports = {
    presets
};