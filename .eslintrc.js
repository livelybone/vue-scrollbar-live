module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'vue'
  ],
  'extends': ['plugin:vue/essential', 'airbnb-base'],
  rules: {
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quote-props': [2, 'consistent'],
    'import/prefer-default-export': [0],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    'global-require': 'off',
    'object-shorthand': [2, 'always', { avoidQuotes: false }],
    'object-curly-newline': 'off',
    'camelcase': 'off',
    'no-mixed-operators':'off',
  },
};