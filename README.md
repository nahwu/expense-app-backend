# Read Me
## 1. Introduction
This repository is meant for a Backend application for an expense tracker application.

**Link for frontend web application:** https://github.com/nahwu/expense-app-react

## 2. Purpose
While there are many expense trackers out there. The good ones are mostly behind a paywall. 
There is also the 
**Knowledge** of your own expenses is very crucial to our personal financial health for both the present and the future.
It only takes 20 average medium-sized spending (e.g. $50) within a month to reach 4 figure expense (>= $1000) for the month.
It's not uncommon to know someone who spends beyond their means, especially when one suddenly have more income than before. 

The goal is to begin with expense awareness and then expand to expense budgeting >> saving & networth projection >> retirement planning


## 3. Supported features
1. Expenses info - Date, item description, expense category, payer, receiver, amount
1. Connection to MongoDB
1. API for creating new transaction
1. API for retrieving all transactions
1. API for dynamic transaction search support (optional search filters, sort, sort direction, partial match, case sensitivity)


## 4. Development Roadmap
1. **Feature:** Add support for delete Transaction API
1. **Feature:** Add support for edit Transaction API
1. **Feature:** Add support for aggregation Transaction API (for descriptive analytics e.g. charts)
1. **Feature:** Add support for list, create, edit, delete Expense Category API
1. **Feature:** Add support for income
1. **Feature:** Add support for list, create, edit, delete Expense Payer API
1. **Feature:** Add support for list, create, edit, delete Expense Receiver API
1. Add in dockerfile for this application
1. Add in docker compose file to include MongoDB deployment
1. **Feature:** Allow data import from CSV file
    1. Flexible field-name remapping for data import/export
1. **Feature:** Allow data export to CSV file
1. Add in pagination (page + page size) for results
1. **Feature:** Investment tracking
1. **Feature:** Account login
1. **Feature:** Account creation
1. **Feature:** Multi accounts visibility for family sharing
1. **Feature:** Upload and attach image to expense
1. Properly do Swagger documentation (OpenAPI 3)


# X. OPTIONAL - Developers only

### X1. To run NodeJS application
```sh
node app.js
```

### X2. Redo dependencies (package.json)
1. (Optional) Delete package.json and package-lock.json
2. Swagger UI Express
```sh
npm install swagger-ui-express -S
```
3. MongoDB dependency
```sh
npm install --save mongodb
```
