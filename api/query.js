var mysql = require("mysql");

const query = (sql, val) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie",
    multipleStatements: true
  });

  connection.connect();
  return new Promise((res, rej) => {
    connection.query(`select  ${sql}  ,img from ${val} ;select COUNT(DISTINCT mname) as total from ${val}  `,function(
      error,
      results,
      fields
    ) {
      try {
        res(results);
      } catch (error) {
        rej(error)
      }
    });
    connection.end()
  });
};

const queryList = (name,page) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie",
    multipleStatements: true
  });

  connection.connect();
  return new Promise((res, rej) => {
    connection.query(`select COUNT(DISTINCT mname) as total from ${name} ;select DISTINCT mname,img from ${name} limit ${page},12`,function(
      error,
      results,
      fields
     ) {
      try {
        res(results)
      } catch (error) {
       rej(error)
       
      }
     
    })
    connection.end()
  });
 
};

module.exports = { query ,queryList};
