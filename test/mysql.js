const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host     : '101.101.211.118',
  user     : 'mydeal',
  password : 'Tlemsl99!!',
  database : 'testdb'
});
 
connection.connect();
 
connection.query('select * from Dept where id=?', ['3'], function (error, results, fields) {
  if (error) throw error;
  util.log('The First Dept is: ', results[0]);
});
 
connection.end();
