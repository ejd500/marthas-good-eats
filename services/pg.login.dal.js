const pgDAL = require("../services/pg.auth.db");

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

 
module.exports = {getLoginByEmail};