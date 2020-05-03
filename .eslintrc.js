module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    // Mithril
    m: 'readonly',
  },
  parser: 'babel-eslint',
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    // This is needed because of <script type="module">
    'import/extensions': ['error', 'always'],

    // Functions are hoisted and thus safe to use before defining them
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],

    'prettier/prettier': 'error',

    // The Prettier plugin overrides this Airbnb config
    quotes: ['error', 'single', { avoidEscape: true }],

    semi: ['error', 'never'],
    'simple-import-sort/sort': 'error',
  },
}
