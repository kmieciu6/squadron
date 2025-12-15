import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
    { ignores: [".next/**", "node_modules/**", "dist/**", "out/**"] },

    js.configs.recommended,
    nextPlugin.configs.recommended, // lub core-web-vitals jeśli używasz
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],

    {
        settings: { react: { version: "detect" } },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: { ...globals.browser },
        },
    },
];