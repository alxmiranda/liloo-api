"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conn = require("conn.js");

var _conn2 = _interopRequireDefault(_conn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var execQuery = function execQuery(sqlQry, res) {
  var textLog = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "executou";

  _conn2.default.query(sqlQry, function (error, results) {

    if (error) {
      res.json(error);
    } else {
      res.json(results);
    }

    _conn2.default.end();
    console.log(textLog);
  });
};

exports.default = execQuery;
//# sourceMappingURL=querys.js.map