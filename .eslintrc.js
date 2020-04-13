module.exports = {
  env: {
    browser: true
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    // Mithril
    m: 'readonly',
  },
  plugins: [
    'prettier',
    'simple-import-sort'
  ],
  rules: {
    // This is needed because of <script type="module">
    'import/extensions': ['error', 'always'],

    'prettier/prettier': 'error',

    // The Prettier plugin overrides this Airbnb config
    quotes: ['error', 'single', { avoidEscape: true }],

    semi: ['error', 'never'],
    'simple-import-sort/sort': 'error',
  },
}
