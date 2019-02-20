import mysql from 'mysql';

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'db_liloo'
// });
const connection = mysql.createConnection({
  host     : 'drosfreemysql.cu8s1cpm8vjl.us-east-1.rds.amazonaws.com',
  user     : 'deividroger',
  password : 'Xp543TyVb',
  database : 'db_liloo'
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

export default connection;