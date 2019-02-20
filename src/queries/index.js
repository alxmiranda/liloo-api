import SqlString from 'sqlstring';
import connection from './../bd/conn';

const execquery = (query, arr, cb) => {
  const queryProtected = SqlString.format(query, arr);
  
  connection.query(queryProtected, (err, result) => {
    const queryResponse = {
      con: connection,
      result: {
        codeResult: 0,
        errorMsg: '',
        data: null,
      },
    }
    if(err) {
      queryResponse.result.codeResult = 1;
      queryResponse.result.errorMsg = err;
      cb(queryResponse);
    } else {
      queryResponse.result.data = result;
      cb(queryResponse);
    }
  });
}

export {
  connection,
  execquery,
};