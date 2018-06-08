module.exports = {
  parserOptions: {
    ecmaVersion: 9
  },
  plugins: ['jest', 'prettier', 'security'],
  env: {
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended'
  ],
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: 'info' }],
    'no-console': 'warn'
  }
}
