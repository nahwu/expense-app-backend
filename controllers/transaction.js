const Transaction = require("../models/transaction");

exports.getAllTransactions = (req, res, next) => {
  Transaction.fetchAll().then((transactions) => {
    res.json(transactions);
  });
};

exports.getTransactionsByItem = (req, res, next) => {
  Transaction.findByItem(req.body.item).then((transactions) => {
    res.json(transactions);
  });
};

exports.getTransactionsOptionalFilters = (req, res, next) => {
  // Case Sensitivity. Default: no case sensitivity. Set value to '' to apply.
  let caseSensitivity = "i";
  if (req.body.caseSensitive && req.body.caseSensitive === true) {
    caseSensitivity = "";
  }
  console.log("Case sensitivity: ", caseSensitivity);

  // Process optional Filter parameters
  let searchFilters = {};
  //(req.body.org_id) ? (searchFilters.org_id = parseInt(req.body.org_id)) : "";
  req.body.item ? (searchFilters.item = req.body.item) : "";
  req.body.date ? (searchFilters.date = req.body.date) : "";
  req.body.category ? (searchFilters.category = req.body.category) : "";
  req.body.payee ? (searchFilters.payee = req.body.payee) : "";
  req.body.receiver ? (searchFilters.receiver = req.body.receiver) : "";
  req.body.amount ? (searchFilters.amount = req.body.amount) : "";
  req.body.imageUrl ? (searchFilters.imageUrl = req.body.imageUrl) : "";
  // Allow both partial match or exact match. Default is partial match
  //        Add in ^ for start_with
  //        Add in $ for end_with
  //        Cover with both for exact match. Example:  "^searchterm$"
  // Documentation Link 1: https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  // Documentation Link 2: https://morioh.com/p/17b7f3cdc512
  searchFilters.item = new RegExp(searchFilters.item, caseSensitivity); // substring search, case sensitive
  console.log("Search filters: ", searchFilters);

  // Process Sort By parameter
  let sortBy = {};
  let sortDirection = 1;
  if (req.body.sortDirection && req.body.sortDirection === "DESC") {
    sortDirection = -1;
  }
  req.body.sortBy ? (sortBy[req.body.sortBy] = sortDirection) : "";

  console.log("Sort by: ", sortBy);
  console.log("Sort order: ", sortDirection);

  // TODO - Pagination
  let page = req.body.page ? req.body.page * 10 : 0;
  console.log("Page: ", page);

  Transaction.findByOptionalFilters(searchFilters, sortBy).then(
    (transactions) => {
      res.json(transactions);
    }
  );
};

exports.getTransactionsAggCountGroupBy = (req, res, next) => {
  // Optional Date Filters
  let startDate = new Date("0000-00-00");
  let endDate = new Date("9999-12-31");
  if (req.body.startDate && new Date(req.body.startDate)) {
    startDate = new Date(req.body.startDate);
  }
  if (req.body.endDate && new Date(req.body.endDate)) {
    endDate = new Date(req.body.endDate);
  }

  Transaction.getTransactionsAggCountGroupBy(req.body.item, startDate, endDate).then(
    (transactions) => {
      res.json(transactions);
    }
  );
};

exports.postAddTransaction = (req, res, next) => {
  const item = req.body.item;
  const date = req.body.date;
  const category = req.body.category;
  const payer = req.body.payer;
  const receiver = req.body.receiver;
  const amount = req.body.amount;
  const imageUrl = req.body.imageUrl;

  const newTransaction = new Transaction(
    item,
    date,
    category,
    payer,
    receiver,
    amount,
    imageUrl
  );

  newTransaction
    .save()
    .then((result) => {
      console.log("Created transaction");
      res.setHeader("Content-Type", "text/plain");
      res.send("Created transaction");
    })
    .catch((err) => {
      console.log(err);
    });
};
