'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();
var router = _express2.default.Router();

console.log(process.env.DB_HOST);

exports.app = app;
exports.router = router;
//# sourceMappingURL=app.js.map