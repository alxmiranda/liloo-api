import connection from 'conn.js';

const execQuery = (sqlQry, res, textLog = "executou") => {
  connection.query(sqlQry, function(error, results) {

  if(error) {
    res.json(error);
  } else {
    res.json(results);
  }
  
  connection.end();
  console.log(textLog);  
  });
}

export default execQuery;