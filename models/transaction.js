// projection method can be used to select only desired fields in the response from DB. Link: https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp

const getMongoDb = require("../util/mongodb-database").getMongoDb;

class Transaction {
  constructor(item, date, category, payer, receiver, amount, imageUrl) {
    this.item = item;
    this.date = date;
    this.category = category;
    this.payer = payer;
    this.receiver = receiver;
    this.amount = amount;
    this.imageUrl = imageUrl;
  }

  save() {
    const mongoDb = getMongoDb();
    return mongoDb
      .collection("transaction")
      .insertOne(this)
      .then((result) => {
        //console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TODO - Require pagination
  static fetchAll() {
    const mongoDb = getMongoDb();
    return mongoDb
      .collection("transaction")
      .find()
      .toArray()
      .then((transactions) => {
        //console.log(transactions);
        return transactions;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TODO - Require pagination
  static findByItem(itemSearchTerm) {
    const mongoDb = getMongoDb();
    return mongoDb
      .collection("transaction")
      .find({ item: itemSearchTerm })
      .toArray()
      .then((transactions) => {
        //console.log(transactions);
        return transactions;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TODO - Require pagination
  static findByConditionalFilters(searchFilters, sortBy) {
    const mongoDb = getMongoDb();
    return mongoDb
      .collection("transaction")
      .find(searchFilters)
      .sort(sortBy)
      .toArray()
      .then((transactions) => {
        //console.log(transactions);
        return transactions;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Transaction;
