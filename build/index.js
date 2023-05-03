// eslint-disable-next-line strict, lines-around-directive
'use strict';

// eslint-disable-next-line no-underscore-dangle, no-use-before-define
const _express = _interopRequireDefault(require('express'));
// eslint-disable-next-line no-underscore-dangle
function _interopRequireDefault(obj) {
  // eslint-disable-next-line no-underscore-dangle
  return obj && obj.__esModule ? obj : { default: obj };
}
const app = (0, _express.default)();
app.listen(4000);
console.log('Server listen on port', 4000);
