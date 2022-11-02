//const path = require('path');

const express = require("express");

const transactionController = require("../controllers/transaction");

const router = express.Router();

router.get("/transactions", transactionController.getAllTransactions);
router.get("/transactions/item", transactionController.getTransactionsByItem);
router.get("/transactions/filters",transactionController.getTransactionsConditionalFilters);

router.post("/transactions", transactionController.postAddTransaction);

// TODO - EDIT API

// TODO - DELETE API

module.exports = router;
