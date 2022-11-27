//const path = require('path');

const express = require("express");

const transactionController = require("../controllers/transaction");
const csvController = require("../controllers/csvImport");
const testController = require("../controllers/mytest");

const router = express.Router();

router.get("/transactions", transactionController.getAllTransactions);
router.get("/transactions/item", transactionController.getTransactionsByItem);
router.post("/transactions/filters",transactionController.getTransactionsOptionalFilters);

// TODO - Consider removing due to lack of usage
router.get("/transactions/agg-count-group-by-category",transactionController.getTransactionsAggCountGroupByCategory);

router.get("/transactions/agg-sum-group-by-category",transactionController.getTransactionsAggSumGroupByCategory);

router.post("/transactions", transactionController.postAddTransaction);

// TODO - EDIT API

// TODO - DELETE API
router.delete("/transactions", transactionController.deleteTransactionById);

// Import CSV
router.post("/transactions/import/csv", csvController.addTransactionByCsv);

// For Load testing only
router.post("/test/insert-massive-data", testController.writeManyTestData);

module.exports = router;
