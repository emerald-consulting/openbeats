module.exports = {
  env: {
    browser: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // uses typescript-specific linting rules
    'plugin:react/recommended', // uses react-specific linting rules
    'prettier', // disables react-specific linting rules that conflict with prettier
    'plugin:prettier/recommended', // uses react-specific linting rules
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: [
    'react',
    'import', // eslint-plugin-import for custom configure
    '@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    "react/no-unescaped-entities": 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'ignore',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react/display-name': 'off',
    'import/no-unresolved': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: 'path/to/folder',

        // Multiple tsconfigs (Useful for monorepos)

        // use a glob pattern
        project: 'packages/*/tsconfig.json',

        // use an array
        project: [
          'packages/module-a/tsconfig.json',
          'packages/module-b/tsconfig.json',
        ],

        // use an array of glob patterns
        project: ['packages/*/tsconfig.json', 'other-packages/*/tsconfig.json'],
      },
    },
  },
}
