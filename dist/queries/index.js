'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execquery = exports.connection = undefined;

var _sqlstring = require('sqlstring');

var _sqlstring2 = _interopRequireDefault(_sqlstring);

var _conn = require('./../bd/conn');

var _conn2 = _interopRequireDefault(_conn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var execquery = function execquery(query, arr, cb) {
  var queryProtected = _sqlstring2.default.format(query, arr);

  _conn2.default.query(queryProtected, function (err, result) {
    var queryResponse = {
      con: _conn2.default,
      result: {
        codeResult: 0,
        errorMsg: '',
        data: null
      }
    };
    if (err) {
      queryResponse.result.codeResult = 1;
      queryResponse.result.errorMsg = err;
      cb(queryResponse);
    } else {
      queryResponse.result.data = result;
      cb(queryResponse);
    }
  });
};

exports.connection = _conn2.default;
exports.execquery = execquery;
//# sourceMappingURL=index.js.map