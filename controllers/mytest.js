const MyTestModel = require("../models/mytest");

exports.writeManyTestData = (req, res, next) => {
  const writeSize = parseInt(req.body.writeSize);

  MyTestModel.writeManyTestData(writeSize)
    .then((result) => {
      res.setHeader("Content-Type", "text/plain");
      res.send("Inserted " + result + " rows into database.");
    })
    .catch((err) => {
      console.log(err);
    });
};
