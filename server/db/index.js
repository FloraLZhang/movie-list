//create a database connection and export through this file
var mysql = require('mysql2');

var connection = mysql.createConnection({
  user:'root',
  password:'',
  database:'movielist',
});

connection.connect();
module.exports = connection;