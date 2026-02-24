// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  // ---------------------------------------------------------------
  // Global ignores — replaces .eslintignore in ESLint v9
  // ---------------------------------------------------------------
  {
    ignores: [
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "node_modules/**",
      "public/**",
      "*.min.js",
      "coverage/**",
      ".husky/**",
      "next.config.*",
      "tailwind.config.*",
      "postcss.config.*",
    ],
  },

  // ---------------------------------------------------------------
  // Next.js core rules via FlatCompat bridge
  // ---------------------------------------------------------------
  ...compat.extends("next/core-web-vitals"),

  // ---------------------------------------------------------------
  // TypeScript + React source files
  // ---------------------------------------------------------------
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: true,
      },
    },
    rules: {
      // ----- TypeScript -----
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",

      // ----- React -----
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "warn",
      "react/no-unescaped-entities": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "never",
        },
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],

      // ----- React Hooks -----
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ----- Imports -----
      "import/no-duplicates": "error",
      "import/no-cycle": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // ----- Accessibility -----
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/interactive-supports-focus": "warn",

      // ----- General -----
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-debugger": "error",
      "no-unused-vars": "off",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
    },
  },

  // ---------------------------------------------------------------
  // API routes — relax some rules for server-side code
  // ---------------------------------------------------------------
  {
    files: ["src/app/api/**/*.{ts,tsx}", "src/pages/api/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // ---------------------------------------------------------------
  // Config & script files — JS/CJS at project root
  // ---------------------------------------------------------------
  {
    files: ["*.{js,mjs,cjs}"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "no-console": "off",
    },
  },
];

export default eslintConfig;
