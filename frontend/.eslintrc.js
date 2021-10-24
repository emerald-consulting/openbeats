module.exports = {
  env: {
    browser: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  parser:  "@typescript-eslint/parser",  // Specifies the ESLint parser
  extends:  [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // uses typescript-specific linting rules
    "plugin:react/recommended", // uses react-specific linting rules
    "prettier", // disables react-specific linting rules that conflict with prettier
    "plugin:prettier/recommended", // uses react-specific linting rules
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: [
    "react",
    "import", // eslint-plugin-import for custom configure
    "@typescript-eslint",
  ],
  parserOptions:  {
    ecmaVersion:  2020,  // Allows for the parsing of modern ECMAScript features
    sourceType:  "module",  // Allows for the use of imports
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-explicity-any": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "react/display-name": "off"
  },
  settings: {
    "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
    "import/resolver": {
      "typescript": {},
    },
  }
};