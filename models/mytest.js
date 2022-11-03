const getMongoDb = require("../util/mongodb-database").getMongoDb;

class MyTest {
  constructor(item, date, category, payer, receiver, amount, imageUrl) {
    this.item = item;
    this.date = new Date(date); // Format can be "2022-11-01" or "2022-11-01T23:58:18Z"
    this.category = category;
    this.payer = payer;
    this.receiver = receiver;
    this.amount = amount;
    this.imageUrl = imageUrl;
  }

  writeManyTestData(writeSize) {
    let testDataArray = [];

    console.log(new Date(), " Preparing data in-memory.");
    // create an array of documents to insert
    for (let i = 0; i < writeSize; i++) {
      testDataArray.push({ index: i, name: "cake", healthy: false });
    }
    console.log(new Date(), " Ready to insert into database.");

    const mongoDb = getMongoDb();
    return mongoDb
      .collection("test")
      .insertMany(testDataArray)
      .then((result) => {
        //console.log(result);
        console.log(new Date(), writeSize, "Database insertions completed.");
        return writeSize;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = MyTest;
