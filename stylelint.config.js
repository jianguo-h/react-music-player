module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    'comment-empty-line-before': 'always',
    'rule-empty-line-before': [
      'always',
      { ignore: ['after-comment', 'inside-block'] },
    ],
  },
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
};
