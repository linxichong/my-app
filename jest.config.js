module.exports = {
    // 设置jsdom运行环境的URL
    // 默认值：: http://localhost
    testURL: 'http://localhost/',
    // glob模式指定查找测试文件的规则
    // 默认值：: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]
    testMatch: [
        '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    // 项目模块中使用的文件扩展名数组
    // 默认值：: ["js", "json", "jsx", "ts", "tsx", "node"]
    // 因为是从左到右寻找，推荐将自项目常用的文件扩展名排在前面
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    // 每个测试文件运行前执行指定代码配置或者是创建测试环境
    // 默认值：[]
    setupFiles: [
        '<rootDir>/__test__/test.setup.ts',
    ],
    // 指定测试环境
    // 默认值︰"jsdom"，这里是指jsdom11
    // 可以安装自定义的测试环境，来指定对应的jsdom版本，例如jest-environment-jsdom-fourteen
    testEnvironment: 'jsdom',
    // 指定模块的搜索路径
    // 默认值：[]
    modulePaths: ['<rootDir>/src/'],
    // 允许使用一个简单的module，来替换类似图片，样式类的资源
    // 默认值︰null
    moduleNameMapper: {}
};
