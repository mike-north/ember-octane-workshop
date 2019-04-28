'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-html-comments': false,
    'no-implicit-this': { allow: ['current-time'] },
    'img-alt-attributes': false,
    'self-closing-void-elements': false,
    quotes: false
  }
};
