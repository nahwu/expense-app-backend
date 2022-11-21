const fs = require("fs");
const { parse } = require("csv-parse");
const Transaction = require("../models/transaction");

// TODO - Take in CSV file (multipart)
exports.addTransactionByCsv = (req, res, next) => {
  let csvRowsFound = 0;
  let insertionDataArray = [];

  // Load data from CSV
  console.log(
    new Date().toISOString(),
    "- Loading & converting data in-memory."
  );
  fs.createReadStream("./Register.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      csvRowsFound++;
      const dateParts = row[1].split("/");
      const formattedDate = new Date(
        dateParts[2],
        dateParts[1] - 1,
        dateParts[0]
      ); // January - 0, February - 1, etc.

      insertionDataArray.push({
        item: row[6],
        date: formattedDate,
        category: row[5],
        payer: row[7] > 0 ? "Nah Wu" : row[2], // If expense, then payer is "Nah Wu"
        receiver: row[8] > 0 ? "Nah Wu" : "", // If income indicated, then receiver is "Nah Wu"
        amount: row[7] > 0 ? row[7] : row[8],
        imageUrl: "",
      });
    })
    .on("end", function () {
      console.log(
        new Date().toISOString(),
        "- Finished processing CSV file. Ready to insert into database. Size:",
        csvRowsFound
      );

      Transaction.addTransactionByCsv(insertionDataArray, csvRowsFound)
        .then((result) => {
          res.setHeader("Content-Type", "text/plain");
          res.send("Inserted " + result + " rows into database.");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .on("error", function (error) {
      console.log(error.message);
    });
};
