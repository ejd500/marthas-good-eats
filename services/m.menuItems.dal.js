const {ObjectId} = require('mongodb');
const mongoDAL = require('./m.auth_db.js');

async function getMenuItems() {
    if(DEBUG) console.log("Menu_Items.mongo.dal.getMenuItems()");
    try {
      await mongoDAL.connect();
      console.log("Connected to Mongo database")
      const cursor = mongoDAL.db("Restaurant").collection("Menu_Items").find();
      const results = await cursor.toArray();
      return results;
    } catch(error) {
      // this is where you write to the event log
      console.log(error);
    } finally {
      mongoDAL.close();
    }
};

async function getMenuItemById(id) {
  if(DEBUG) console.log("Menu_Items.dal.getMenuItemById()");
  try {
    await mongoDAL.connect();
    const database = mongoDAL.db("Restaurant");
    const collection = database.collection("Menu_Items");
    const result = await collection.find({ _id: new ObjectId(id) }).toArray();
    if(DEBUG) console.log(result[0]);
    return result[0];
  } catch(error) {
    console.error('Error occurred while fetching data from MongoDB:', error);
    // throw error;
  } finally {
    mongoDAL.close();
  }
};

async function addMenuItem(name, description, price, category, image_url) {
  if(DEBUG) console.log("Menu_Items.mongo.dal.addMenuItem()");
  let newMenuItem = JSON.parse(`{"name": "${name}", "description": "${description}", "price": "${price}", "category": "${category}", "image_url": "${image_url}"}`);
  if(DEBUG) console.log(newMenuItem);

  try {
    await mongoDAL.connect();
    console.log("Connected to MongoDB");
    const database = mongoDAL.db("Restaurant");
    const collection = database.collection("Menu_Items");
    const result = await collection.insertOne(newMenuItem);
    // const result = await mongoDAL.db("Restaurant").collection("Menu_Items").insertOne(newMenuItem);
    if(DEBUG) console.log(`InsertedId: ${result.insertedId}`)
    return result.insertedId;
  } catch (error) {
    if(DEBUG) console.log(`mongo error: ${error}`)
    return error;
    // if(error.code === 11000) {  
    //   return error.code;
    // }
    // record the error in event logging
  } finally {
    mongoDAL.close();
    console.log("Disconnected from MongoDB");
  }
};


async function patchMenuItem(_id, name, description, price, category, image_url) {
    if (DEBUG) console.log("Menu_Items.mongo.dal.patchMenuItem()");
    try {
        await mongoDAL.connect();
        const result = await mongoDAL.db("Restaurant").collection("Menu_Items").updateOne(
            { _id: new ObjectId(_id) }, 
            { $set: { name, description, price, category, image_url } } 
        );
      return result;
    } catch (error) {
        console.log('Error occurred while patching menu item:', error);
    } finally {
        mongoDAL.close();
    }
};


async function deleteMenuItem(_id) {
    if (DEBUG) console.log("Menu_Items.mongo.dal.deleteMenuItem()");
    try {
        await mongoDAL.connect();
        const result = await mongoDAL.db("Restaurant").collection("Menu_Items").deleteOne({ _id: new ObjectId(_id) });
        return result; 
    } catch (error) {
        console.error('Error occurred while deleting menu item:', error);
    } finally {
        mongoDAL.close();
    }
};


module.exports = {
    getMenuItems, 
    getMenuItemById,
    addMenuItem,
    patchMenuItem,
    deleteMenuItem
};