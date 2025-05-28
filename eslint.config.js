import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        languageOptions: {
            globals: globals.browser
        },
        extends: ["js/recommended"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "no-restricted-syntax": [
                "warn",
                {
                    selector: "ClassDeclaration",
                    message: "Использование class запрещено"
                },
                {
                    selector: "ClassExpression",
                    message: "Class expressions тоже запрещены"
                },
                {
                    selector:
                        "CallExpression[callee.object.name='console'][callee.property.name='log']",
                    message: "Использование console.log в продакшене запрещено"
                }
            ]
        }
    },
    {
        ignores: [
            ".github",
            ".vscode",
            "node_modules",
            "dist",
            "package-lock.json",
            "postcss.config.cjs",
            "vite.config.js"
        ]
    }
]);
