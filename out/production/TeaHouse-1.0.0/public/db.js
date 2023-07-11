const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '103.107.182.219',
  user: 'root',
  password: 'yuufboRwtdkw5y3V23MbkU3',
  port: 3306,
  database: 'jewelly'
});

connection.connect(error => {
  console.log(error)
  // console.log('ok')
});

module.exports = connection; 