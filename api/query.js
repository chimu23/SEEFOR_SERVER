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
//获取home页的图片跟名称
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

//获取Detail
const queryDetail = (activeName, mname) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie",
    multipleStatements: true
  });

  connection.connect();
  return new Promise((res, rej) => {
    connection.query(`select DISTINCT mname,img ,introduce, star, director, actor, region, language,time  from ${activeName} WHERE mname ='${mname}';
    select src , steps from ${activeName} WHERE mname  ='${mname}'`,function(
      error,
      results,
      fields
     ) {
      try {
        // const sql =`select DISTINCT mname,img ,star, director, actor, region, language,time  from ${activeName} WHERE mname ='${mname}'`
        // console.log(sql)
        
        res(results)
      } catch (error) {
       rej(error)
       
      }
     
    })
    connection.end()
  });
 
};


// 查找单个用户
const queryUser =(name)=>{
  console.log(name)
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie",
    multipleStatements: true
  });

  connection.connect();
  return new Promise((res, rej) => {
    connection.query(`select *  from users WHERE name ='${name}'`,function(
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

// 根据名字查找电影
const querySerach = (val) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movie"
    // multipleStatements: true
  });

  connection.connect();
  return new Promise((res, rej) => {
    connection.query(`select distinct * FROM
    (
      (select mname,activeName from anime)
      UNION ALL
      (select mname,activeName from carousel)
     UNION ALL
      (select mname,activeName from hot)
     UNION ALL
      (select mname,activeName from movie)
     UNION ALL
      (select mname,activeName from series)
     UNION ALL
      (select mname,activeName from variety)
     ) as a WHEre mname like '%${val}%' `,function(
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

module.exports = { query, queryList, queryDetail, queryUser, querySerach};
