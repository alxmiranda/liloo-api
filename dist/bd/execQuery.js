'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _conn = require('./conn');

var _conn2 = _interopRequireDefault(_conn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const execQuery = (sqlQry, res, textLog = "executou") => {
//   connection.query(sqlQry, function (error, results) {
//     if (error) {
//       res.json(error);
//     }
//     else {
//       console.log();
//       // res.json(results);
//     }

//     connection.end();
//     console.log(textLog);
//   });
// };

exports.default = execSQLQuery;
//# sourceMappingURL=execQuery.js.map