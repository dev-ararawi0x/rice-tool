import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig(
    {
        ignores: ['dist/**', 'node_modules/**', 'coverage/**', '**/*.min.js', 'package-lock.json'],
    },
    js.configs.recommended,
    // ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
)
