// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    prettierConfig,
    {
        languageOptions: {
            parserOptions: {
                projectService: { allowDefaultProject: ["eslint.config.mjs"] },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        ignores: ["dist/", "**/__tests__/"],
    },
);
