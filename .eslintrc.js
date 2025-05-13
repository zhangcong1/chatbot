// ESLint 配置文件，用于代码静态检查
module.exports = {
    // 表示此配置文件为根配置文件，ESLint 不会再向上查找其他配置文件
    root: true,
    // 定义代码运行的环境，这里设置为 Node.js 环境
    env: {
        node: true
    },
    // 继承的 ESLint 规则集
    extends: [
        // Vue 3 基本规则
        'plugin:vue/vue3-essential',
        // ESLint 推荐规则
        'eslint:recommended',
        // Vue 结合 TypeScript 的推荐规则
        '@vue/typescript/recommended'
    ],
    // 解析器选项
    parserOptions: {
        // ECMAScript 版本
        ecmaVersion: 2020
    },
    // 自定义 ESLint 规则，可以根据项目需求添加
    rules: {
        // 可以根据项目需求添加自定义规则
    },
    // 可以通过修改此配置来开启或关闭 ESLint 校验
    enabled: true,
};