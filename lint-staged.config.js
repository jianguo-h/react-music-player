module.exports = {
  'src/**/*.{js?(x),ts?(x)}': [
    'prettier --ignore-path .eslintignore --write',
    'eslint --fix'
  ],
  'src/**/*.{css,less,scss,sass}': ['stylelint --fix']
};
