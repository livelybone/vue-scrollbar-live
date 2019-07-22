module.exports = {
  'parserOptions': {
    'parser': '@typescript-eslint/parser',
  },
  'plugins': [
    'vue',
    'prettier',
    '@typescript-eslint',
  ],
  'extends': [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:vue/essential',
  ],
  'rules': {
    'prettier/prettier': 'error',
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },
}
