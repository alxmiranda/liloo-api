import mysql from 'mysql';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_liloo'
});

export default connection;