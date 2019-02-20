'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bcrypt = require('bcrypt');

var PasswordCreate = function PasswordCreate(text, salt) {
  return bcrypt.hashSync(text, salt);
};
var PasswordCompare = function PasswordCompare(text, hash) {
  return bcrypt.compareSync('' + text, '' + hash);
};

exports.PasswordCreate = PasswordCreate;
exports.PasswordCompare = PasswordCompare;
//# sourceMappingURL=password.js.map