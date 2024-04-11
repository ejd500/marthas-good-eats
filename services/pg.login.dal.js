const pgDAL = require("../services/pg.auth.db");
const bcrypt = require ('bcrypt');

var getLoginByEmail = function(email) {
  if(DEBUG) console.log("Logins.pg.dal.getLoginByEmail()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT user_id, first_name, last_name, email, password, is_staff FROM public."Users" WHERE email = $1`;
    pgDAL.query(sql, [email], (err, result) => {
      if (err) {
        if(DEBUG) console.log("Unable to verify email.");
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};


var createUser = function(firstName, lastName, email, password, isStaff) {
  if (DEBUG) console.log("pg.login.dal.createUser()");
  return new Promise(function(resolve, reject) {
    // Hash password with bcrypt
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) {
        reject(err);
      } else {
        const sql = `INSERT INTO public."Users"(first_name, last_name, email, password, is_staff) VALUES ($1, $2, $3, $4, $5)`;
        const values = [firstName, lastName, email, hash, isStaff];
        pgDAL.query(sql, values, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
        });
      }
    });
  });
};
  
 
module.exports = {getLoginByEmail, createUser};