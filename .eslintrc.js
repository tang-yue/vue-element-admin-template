module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'plugin:vue/essential',
    //   '@vue/airbnb',
    ],
    rules: {
      'no-console': 0,
      'linebreak-style': 0,
      'comma-dangle':0,
      "indent": 0,
      "semi":0,
      "space-infix-ops":0,
      "no-mixed-operators":0,
      "no-trailing-spaces":0,
      "no-multi-spaces":0,
      "no-else-return": 0
    },
    // parserOptions: {
    //   parser: 'babel-eslint',
    // }
  };
  