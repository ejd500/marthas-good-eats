const dal = require("../services/pg.auth.db");

var getLoginByUsername = function(username) {
    if(DEBUG) console.log("Logins.pg.dal.getLoginByUsername()");
    return new Promise(function(resolve, reject) {
      const sql = `SELECT username, password, "isStaff" FROM public."Logins" WHERE username = $1`;
      dal.query(sql, [username], (err, result) => {
        if (err) {
          if(DEBUG) console.log("Unable to verify username.");
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };

  var getIsStaffByUsername = function(username){
    if(DEBUG) console.log("pg.login.dal.getIsStaffByUsername()");
    return new Promise(function(resolve, reject) {
      const sql = `SELECT isStaff FROM public."Logins" WHERE username = $1`;
      dal.query(sql, [username], (err, result) => {
        if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 

  }
 
module.exports = {getLoginByUsername};