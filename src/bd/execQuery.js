import connection from './conn';

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

export default execSQLQuery;