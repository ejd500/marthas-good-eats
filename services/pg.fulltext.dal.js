const pgDAL = require("./pg.auth.db");

var getFullText = function(text) {
  if(DEBUG) console.log("pg.fulltext.dal.getFullText()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT menu_id, name, description, price, category, image_url 
    FROM public."Menu_Items" 
    WHERE  menu_id::text iLIKE '%'||$1||'%' OR
        name iLIKE '%'||$1||'%' OR 
        description iLIKE '%'||$1||'%' OR 
        price::text iLIKE '%'||$1||'%' OR
        category iLIKE '%'||$1||'%' OR 
        image_url iLIKE '%'||$1||'%'`;
    // if(DEBUG) console.log(sql);
    pgDAL.query(sql, [text], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        if(DEBUG) console.log(`Row Count: ${result.rowCount}`);
        resolve(result.rows);
      }
    }); 
  }); 
};

module.exports = {
    getFullText,
}