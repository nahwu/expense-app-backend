const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// The optional use of underscore indicates that this variable will only be INTERNALLY used within this file
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://root:password@127.0.0.1:27017")
    .then((client) => {
      console.log("Connected to MongoDB database!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

// MongoDB database connection object
const getMongoDb = () => {
  if (_db) {
    return _db;
  }
  throw "MongoDB database not found!";
};

exports.mongoConnect = mongoConnect;
exports.getMongoDb = getMongoDb;
