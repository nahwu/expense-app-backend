// projection method can be used to select only desired fields in the response from DB. Link: https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp

const mongodb = require("mongodb");
const getMongoDb = require("../util/mongodb-database").getMongoDb;

class Transaction {
  constructor(item, date, category, payer, receiver, amount, imageUrl) {
    this.item = item;
    this.date = new Date(date); // Format can be "2022-11-01" or "2022-11-01T23:58:18Z"
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
  static fetchAll(maxResultSize) {
    const mongoDb = getMongoDb();
    return mongoDb
      .collection("transaction")
      .find()
      .limit(maxResultSize)
      .toArray()
      .then((transactions) => {
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
        return transactions;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TODO - Require pagination
  static findByOptionalFilters(searchFilters, sortBy, maxResultSize) {
    const mongoDb = getMongoDb();
    return mongoDb
      .collection("transaction")
      .find(searchFilters)
      .sort(sortBy)
      .limit(maxResultSize)
      .toArray()
      .then((transactions) => {
        return transactions;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** Count - Group by features
   * 1. Category
   * 2. TODO - Month
   */
  static getTransactionsAggCountGroupBy(searchTerm, startDate, endDate) {
    const mongoDb = getMongoDb();
    const transactionCollection = mongoDb.collection("transaction");

    const query = [
      //{ $match: { receiver: searchTerm } },
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }, // $gte == greater or equal    $lte == lesser or equal. Be careful that a date without hours refers to 00:00:00 in time and hence may unintentionally EXCLUDE some data
        },
      },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ];

    return transactionCollection
      .aggregate(query)
      .toArray()
      .then((transactions) => {
        return transactions;
      })
      .catch((err) => {
        console.log(err);
      });

    /*
    // Count Documents approach. There is a faster estimated count documents approach
    const query = { item: searchTerm };

    return transactionCollection
      .countDocuments(query)
      .then((transactions) => {
        console.log(transactions);
        return transactions;
      })
      .catch((err) => {
        console.log(err);
      });
    */
  }

  static deleteTransactionById(transactionIds) {
    const mongoDb = getMongoDb();
    return (
      mongoDb
        .collection("transaction")
        //.deleteOne({ _id: new mongodb.ObjectId(transactionId) })
        .deleteMany({
          _id: {
            $in: transactionIds.map(
              (_transactionId) => new mongodb.ObjectId(_transactionId)
            ),
          },
        })
        .then((result) => {
          console.log("Deletion result:", result);
          console.log("Deleted transaction:", transactionIds);
          return result;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  static addTransactionByCsv(insertionDataArray, csvRowsFound) {
    // Save all data to database
    const mongoDb = getMongoDb();
    return mongoDb
      .collection("transaction")
      .insertMany(insertionDataArray)
      .then((result) => {
        console.log(
          new Date().toISOString(),
          "- Completed",
          csvRowsFound,
          "CSV to Database insertions."
        );
        return csvRowsFound;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Transaction;
