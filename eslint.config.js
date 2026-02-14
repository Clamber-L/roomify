import antfu from '@antfu/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default antfu(
    {
        // 1. 核心开启：React Router v7 必须开启 react 和 typescript
        react: true,
        typescript: true,

        // 如果你喜欢 antfu 的风格可以开启，但既然你用了 Prettier，这里建议关闭
        stylistic: false,

        // 忽略文件
        ignores: [
            'dist',
            'node_modules',
            '.history',
            'pnpm-lock.yaml',
            'package-lock.json',
            '.react-router' // 忽略路由生成的临时文件
        ],
    },
    // 2. 针对 TS 文件的解析增强
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            'no-console': 'off',
            // 关闭原生的 unused-vars，交给专门的插件处理
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',

            // 允许 React Router v7 的一些特定模式
            'ts/no-use-before-define': 'off',
            'ts/explicit-function-return-type': 'off',
            'node/prefer-global/process': 'off',
            'node/prefer-global/buffer': 'off',
            'import/no-named-default': 'off',
        },
    },
    // 3. 配置 Perfectionist (antfu 已经内置，可以直接覆盖规则)
    {
        name: 'user/perfectionist-setup',
        rules: {
            'perfectionist/sort-imports': ['error', {type: 'natural', order: 'asc'}],
            'perfectionist/sort-exports': ['error', {type: 'natural', order: 'asc'}],
            'perfectionist/sort-named-imports': ['error', {type: 'natural', order: 'asc'}],
            'perfectionist/sort-named-exports': ['error', {type: 'natural', order: 'asc'}],
        },
    },
    // 4. 配置 Unused Imports (antfu 默认也集成了，这里自定义行为)
    {
        name: 'user/unused-imports',
        rules: {
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
    // 5. 最后合并 Prettier 配置，确保它覆盖所有冲突规则
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
);