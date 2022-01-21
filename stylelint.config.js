module.exports = {
  customSyntax: 'postcss-less',
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-less'],
  rules: {
    'comment-empty-line-before': 'always',
    'rule-empty-line-before': [
      'always',
      { ignore: ['after-comment', 'inside-block'] },
    ],
  },
  overrides: [
    {
      files: ['**/*.module.less'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
};
