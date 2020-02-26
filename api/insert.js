var mysql = require("mysql");

//增加用户
const insertUser = (name,password)=>{
    console.log(name,password)
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "movie",
      multipleStatements: true
    });
    password =require('bcrypt').hashSync(password,10)
    connection.connect();
    return new Promise((res, rej) => {
      connection.query(`insert into  users(name,password)  values('${name}','${password}')`,function(
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
}

module.exports = { insertUser}