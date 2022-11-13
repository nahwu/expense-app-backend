//const path = require('path');

const express = require("express");

const transactionController = require("../controllers/transaction");
const testController = require("../controllers/mytest");

const router = express.Router();

router.get("/transactions", transactionController.getAllTransactions);
router.get("/transactions/item", transactionController.getTransactionsByItem);
router.post("/transactions/filters",transactionController.getTransactionsOptionalFilters);

router.get("/transactions/agg-count-group-by",transactionController.getTransactionsAggCountGroupBy);

router.post("/transactions", transactionController.postAddTransaction);

// TODO - EDIT API

// TODO - DELETE API
router.delete("/transactions", transactionController.deleteTransactionById);

// For Load testing only
router.post("/test/insert-massive-data", testController.writeManyTestData);

module.exports = router;
