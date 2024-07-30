import { db } from "../db/database_mysql80.js";


export const getPoint = async() => {
  const sql = `
    select point from member
  `
  return db
        .execute(sql)
        .then(result => result[0][0])
} 

export const setPoint = async({point}) => {
  // 주문번호 랜덤생성 8자리
  // let orderNum = Math.trunc(Math.random()* 9999)
  // console.log('orderNum', '2024'+orderNum);


  console.log('point repository', point);  
  const sql = `
     update member set point = ?
      where user_id = 'test'
  `
  return db
        .execute(sql, [point])
} 