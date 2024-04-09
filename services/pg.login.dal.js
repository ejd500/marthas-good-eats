const dal = require("../services/pg.auth.db");

var getLoginByEmail = function(email) {
    if(DEBUG) console.log("Logins.pg.dal.getLoginByEmail()");
    return new Promise(function(resolve, reject) {
      const sql = `SELECT user_id, first_name, last_name, email, password, is_staff FROM public."Users" WHERE email = $1`;
      dal.query(sql, [email], (err, result) => {
        if (err) {
          if(DEBUG) console.log("Unable to verify email.");
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

var createUser = function(firstName, lastName, email, password, isStaff){
  if(DEBUG) console.log("pg.login.dal.createUser()");
  return new Promise (function(resolve, reject){
    const sql = `INSERT INTO public."Users"(first_name, last_name, email, password, is_staff) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', ${isStaff});`
    dal.query(sql, [], (err, result)=>{
      if(err){
        console.log(err)
        reject(err);
      } else {
        resolve(result.rows)
      }
    }) 
  });
};
  // var getIsStaffByUsername = function(username){
  //   if(DEBUG) console.log("pg.login.dal.getIsStaffByUsername()");
  //   return new Promise(function(resolve, reject) {
  //     const sql = `SELECT isStaff FROM public."Logins" WHERE username = $1`;
  //     dal.query(sql, [username], (err, result) => {
  //       if (err) {
  //         if(DEBUG) console.log(err);
  //         reject(err);
  //       } else {
  //         resolve(result.rows);
  //       }
  //     }); 
  //   }); 

  // }
 
module.exports = {getLoginByEmail, createUser};