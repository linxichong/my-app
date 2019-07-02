module.exports = {
    "extends": "@stinkstudios/eslint-config-react-app",
    rules: {
        // 不禁用console
        'no-console': 0,
        // 防止在React组件定义中丢失props验证
        "react/prop-types": 0,
        // 关闭 ox 规则中的文件名小写
        'unicorn/filename-case': 0
    }
}


// module.exports = {
//     // 停止在父级目录中查找
//     "root": true,
//     // 启用一系列核心规则
//     "extends": "eslint:recommended",
//     // 启用的规则及其各自的错误级别
//     "rules": {
//         "semi": ["error", "always"],
//         "quotes": "error",
//         // 启用插件专用的规则
//         "example-plugin/eqeqeq": "off"
//     },
//     // 解析器选项
//     "parserOptions": {
//         // ECMAScript 版本
//         "ecmaVersion": 6,
//         // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
//         "sourceType": "module",
//         // 使用的额外的语言特性
//         "ecmaFeatures": {
//             // 启用 JSX
//             "jsx": true
//         }
//     },
//     // 一个对Babel解析器的包装，使其能够与 ESLint 兼容
//     "parser": "babel-eslint",
//     // 全局变量
//     "globals": {
//         "document": false,
//         "window": false,
//         "HTMLInputElement": false,
//         "HTMLDivElement": false,
//         "localStorage": true
//     },
//     // 指定想启用的环境
//     "env": {
//         "browser": true,
//         "commonjs": true,
//         "es6": true,
//         "jest": true,
//         "node": true,
//         // 指定插件专用环境
//         "example-plugin/browser": true
//     },
//     // 配置插件
//     "plugins": [
//         "example-plugin"
//     ],
//     // 匹配特定的 glob 模式的文件
//     overrides: {
//         // 匹配所有.ts .tsx 文件
//         files: ['**/*.ts', '**/*.tsx'],
//         // 指定解析器
//         parser: '@typescript-eslint/parser',
//         // 指定解析器选项
//         parserOptions: {
//           ecmaVersion: 2018,
//           sourceType: 'module',
//           ecmaFeatures: {
//             jsx: true,
//           }
//         }
//     }
// }