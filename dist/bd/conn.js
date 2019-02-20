'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'db_liloo'
// });
var connection = _mysql2.default.createConnection({
  host: 'drosfreemysql.cu8s1cpm8vjl.us-east-1.rds.amazonaws.com',
  user: 'deividroger',
  password: 'Xp543TyVb',
  database: 'db_liloo'
});

// http://drosfreemysql.cu8s1cpm8vjl.us-east-1.rds.amazonaws.com
// deividroger
// Xp543TyVb
// const connection = mysql.createConnection({
//   host: '35.199.106.34',
//   user: 'liloo',
//   password: 'Lil001',
//   database: 'liloo'
// })
// liloo
// Lil001
// $localhost='gerencis.mysql.dbaas.com.br'; 
// $usuario='gerencis';
// $senha='MV955UYTPP23';
// $basededados='gerencis'; 	

exports.default = connection;
//# sourceMappingURL=conn.js.map