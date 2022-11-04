const MyTest = require("../models/mytest");

exports.writeManyTestData = (req, res, next) => {
  const item = req.body.item;
  const date = req.body.date;
  const category = req.body.category;
  const payer = req.body.payer;
  const receiver = req.body.receiver;
  const amount = req.body.amount;
  const imageUrl = req.body.imageUrl;

  const newTransaction = new MyTest(
    item,
    date,
    category,
    payer,
    receiver,
    amount,
    imageUrl
  );

  const writeSize = parseInt(req.body.writeSize);

  /*
  newTransaction
    .writeManyTestData(writeSize)
    .then((result) => {
      res.setHeader("Content-Type", "text/plain");
      res.send("Inserted " + result + " rows into database.");
    })
    .catch((err) => {
      console.log(err);
    });
*/

  MyTest.writeManyTestData2(writeSize)
    .then((result) => {
      res.setHeader("Content-Type", "text/plain");
      res.send("Inserted " + result + " rows into database.");
    })
    .catch((err) => {
      console.log(err);
    });
};
