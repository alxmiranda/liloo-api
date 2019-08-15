'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = '234t432xdvdwsde³!';

var PasswordCreate = function PasswordCreate(text, salt) {
  return bcrypt.hashSync(text, salt);
};
var PasswordCompare = function PasswordCompare(text, hash) {
  return bcrypt.compareSync('' + text, '' + hash);
};

var Encrypt = function Encrypt(text) {

  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

var Decrypt = function Decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

exports.PasswordCreate = PasswordCreate;
exports.PasswordCompare = PasswordCompare;
exports.Encrypt = Encrypt;
exports.Decrypt = Decrypt;
//# sourceMappingURL=password.js.map