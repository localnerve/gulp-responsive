import js from '@eslint/js';
import globals from 'globals';

const commonRules = {
  ...js.configs.recommended.rules,
  indent: [2, 2, {
    'SwitchCase': 1,
    'MemberExpression': 1
  }],
  'quotes': [2, 'single']
};

export default [{
  files: [
    'lib/**'
  ],
  ...js.configs.recommended,
  rules: commonRules,
  languageOptions: {
    globals: {
      ...globals.node
    }
  }
}, {
  files: [
    'test/**'
  ],
  ...js.configs.recommended,
  rules: commonRules,
  languageOptions: {
    globals: {
      ...globals.mocha,
      ...globals.node
    }
  }
}];