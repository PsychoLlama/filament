const eslint = exports;

eslint.env = {
  node: true,
  jest: true,
  es6: true,
};

eslint.extends = [
  'eslint:recommended',
  'llama',
];

eslint.parser = 'babel-eslint';

eslint.parserOptions = {
  sourceType: 'module',
};
