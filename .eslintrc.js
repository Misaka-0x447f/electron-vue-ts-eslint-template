module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-vue'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/html-self-closing': ['error', {
      html: { void: 'always' }
    }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '_+', argsIgnorePattern: '_+' }
    ],
    // produce bugs
    'vue/first-attribute-linebreak': 'off',
    // produce bugs
    'vue/no-reserved-props': 'off'
  },
  root: true,
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    '@vue/standard'
  ]
}
