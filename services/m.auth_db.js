const { MongoClient } = require('mongodb');

const uri = process.env.MDBLOCAL;

const atlas = process.env.MDBATLAS;

const pool = new MongoClient(uri);
//const pool = new MongoClient(atlas);

pool.on('connected', () => {
    console.log("Connected to MongoDB");
});

module.exports = pool;