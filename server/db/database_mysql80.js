import mysql from "mysql2";

const pool = mysql.createPool({ 
  host : "127.0.0.1",
  port : "3306",
  user : "root",
  password : "mysql1234",
  database : "junghye"
});

export const db = pool.promise();