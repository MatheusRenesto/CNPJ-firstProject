import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint.config.js or .eslintrc.js
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["next", "eslint:recommended"],
  rules: {
    // Allow these in development, error in production
    "no-console": isProduction ? "warn" : "off",
    "no-debugger": isProduction ? "warn" : "off",
    "no-unused-vars": isProduction
      ? ["warn", { argsIgnorePattern: "^_" }]
      : "off",

    // Other rules can stay strict
    "react/react-in-jsx-scope": "off", // Next.js doesn't need React in scope
  },
};

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
