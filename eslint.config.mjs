import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import n from "eslint-plugin-n"
import perfectionist from "eslint-plugin-perfectionist"
import unicorn from "eslint-plugin-unicorn"
import tseslint from "typescript-eslint"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      n,
      perfectionist,
      unicorn,
    },
    rules: {
      "n/no-process-env": "error",
      "no-console": "error",
      "perfectionist/sort-imports": "error",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
  },
  eslintConfigPrettier,
  {
    ignores: ["dist"],
  }
)
