import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";

export default [
    js.configs.recommended,
    nextPlugin.configs.recommended,
    react.configs.flat.recommended,
];