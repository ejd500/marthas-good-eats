const dal = require("../services/pg.auth.db");

var getMenuItems = function() {
  if(DEBUG) console.log("Menu_Items.pg.dal.getMenuItems()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT * FROM public."Menu_Items"\
    ORDER BY menu_id ASC;`
    dal.query(sql, [], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var getMenuItemById = function(menu_id) {
  if(DEBUG) console.log("logins.pg.dal.getMenuItemById()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT  menu_id, name, description, price, category, image_url FROM public."Menu_Items" WHERE menu_id = $1`;
    dal.query(sql, [menu_id], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var addMenuItem = function(name, description, price, category, image_url) {
  if(DEBUG) console.log("Menu-Items.pg.dal.addMenuItem()");
  return new Promise(function(resolve, reject) {
    const sql = `INSERT INTO public."Menu_Items"(name, description, price, category, image_url) \
        VALUES ($1, $2, $3, $4, $5);`
    dal.query(sql, [name, description, price, category, image_url], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var patchMenuItem = function(menu_id, name, description, price, category, image_url) {
  if(DEBUG) console.log("Menu_Items.pg.dal.patchMenuItem()");
  return new Promise(function(resolve, reject) {
    const sql = `UPDATE public."Menu_Items" SET name=$2, description=$3, price=$4, category=$5, image_url=$6 WHERE menu_id=$1;`;
    dal.query(sql, [menu_id, name, description, price, category, image_url], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var deleteMenuItem = function(menu_id) {
  if(DEBUG) console.log("Menu_Items.pg.dal.deleteMenuItem()");
  return new Promise(function(resolve, reject) {
    const sql = `DELETE FROM public."Menu_Items" WHERE menu_id = $1;`
    dal.query(sql, [menu_id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

module.exports  = {getMenuItems, getMenuItemById, addMenuItem, patchMenuItem, deleteMenuItem};
