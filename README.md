## 1. Development Roadmap
1. Add support for delete Transaction API
1. Add support for edit Transaction API
1. Add support for aggregation API
1. Add in docker compose file to include MongoDB deployment
1. Add in pagination (page + page size) for results
1. Properly do Swagger documentation (OpenAPI 3)

## 2. Supported features
1. Connection to MongoDB
1. API for adding new transaction
1. API for retrieving all transactions
1. API for dynamic transaction search support (optional search filters, sort, sort direction, partial match, case sensitivity)

## 3. To run NodeJS application - OPTIONAL - Developers only
```sh
node app.js
```

## 4. Redo dependencies (package.json) OPTIONAL - Developers only
1. (Optional) Delete package.json and package-lock.json
2. Swagger UI Express
```sh
npm install swagger-ui-express -S
```
3. MongoDB dependency
```sh
npm install --save mongodb
```
