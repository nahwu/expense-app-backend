const getMongoDb = require("../util/mongodb-database").getMongoDb;
const MyUtil = require("../util/helper");

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

  /*
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
        console.log(new Date(), writeSize, "Database insertions completed.");
        return writeSize;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  */

  static writeManyTestData2(writeSize) {
    let testDataArray = [];

    const categoryArray = ["face", "body", "vehicle", "anpr", "vmmr"];
    const payerArray = ["person1", "person2", "person3"];
    const receiverArray = ["person1", "person2", "person3"];

    console.log(new Date().toISOString(), " Preparing data in-memory. 2");
    // create an array of documents to insert
    for (let i = 0; i < writeSize; i++) {
      testDataArray.push({
        index: i,
        item: "cake",
        date: new Date(),
        category: MyUtil.getRandomMultipleArrayItem(categoryArray, 1)[0],
        payer: MyUtil.getRandomMultipleArrayItem(payerArray, 1)[0],
        receiver: MyUtil.getRandomMultipleArrayItem(receiverArray, 1)[0],
        amount: Math.floor(Math.random() * (50 - 0.01 + 1)) + 0.01,
        imageUrl:
          "c2RmYXNmdnNkZmR2ZmRzMjRmcjNc2c2RmYXNmdnNkZmR2ZmRzMjRmcjNc2RmYXNmdnNkZmR2ZmRzMjRmcjNc2RmYXNmdnNkZmR2ZmRzMjRmcjNc2RmYXNmdnNkZmR2ZmRzMjRmcjNc2RmYXNmdnNkZmR2ZmRzM0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0c2RmYXNmdnNkZmR2ZmRzMjRmcjN0MzR0MzR0NHQzdHZ3NXQ1dHd0MzR0",
        healthy: false,
      });
    }
    console.log(new Date().toISOString(), " Ready to insert into database. 2");

    const mongoDb = getMongoDb();
    return mongoDb
      .collection("transaction")
      .insertMany(testDataArray)
      .then((result) => {
        //console.log(result);
        console.log(
          new Date().toISOString(),
          writeSize,
          "Database insertions completed. 2"
        );
        return writeSize;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = MyTest;
