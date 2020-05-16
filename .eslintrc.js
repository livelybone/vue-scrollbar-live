module.exports = {
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
  },
  'plugins': [
    '@typescript-eslint',
    'vue',
    'prettier'
  ],
  'extends': [
    'airbnb-base',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
  ],
  'rules': {
    'no-useless-constructor': 0,
    'no-undef': 0,
    'import/prefer-default-export': 0,
    "@typescript-eslint/no-unused-vars": 1,
    'prettier/prettier': 2,
    'no-console': [2, { allow: ["warn", "error"] }],
    'no-shadow': 2,
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },
}
