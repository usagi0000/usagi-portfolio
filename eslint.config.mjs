import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react 7.x is incompatible with ESLint 10's removed
  // `context.getFilename()` when React version detection runs. Pinning the
  // version avoids the broken "detect" path.
  {
    settings: {
      react: {
        version: "19.2.8",
      },
    },
    rules: {
      // Template UI components (carousel) and localStorage hydration use this
      // pattern intentionally; keep it visible without failing lint.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
