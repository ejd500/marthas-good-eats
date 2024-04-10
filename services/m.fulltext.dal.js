const { ObjectId } = require("mongodb");
const mongoDAL = require("./m.auth_db");

async function getFullText(fulltext) {
    if(DEBUG) console.log("m.fulltext.dal.getFullText()");
    try {
      await mongoDAL.connect();
      const database = mongoDAL.db("Restaurant");
      const collection = database.collection("Menu_Items");
      const result = await collection.find({ $text: { $search: fulltext } }).toArray();
      return result;
    } catch(err) {
      console.error('Error occurred while connecting to MongoDB:', err);
      throw err;
    } finally {
      mongoDAL.close();
    }
  };
  
  module.exports = {
      getFullText,
    }