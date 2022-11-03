//const http = require('http');

// MongoDB
const mongoConnect = require("./util/mongodb-database").mongoConnect;

const path = require("path");

// APIs
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const hostname = "127.0.0.1";
const port = 8080;

app.use(bodyParser.json()); // Parse request body
app.use(express.static(path.join(__dirname, "public"))); // TODO - Learn purpose

const transactionRoutes = require("./routes/transaction");

app.use("/v1", transactionRoutes);

// Swagger documentation for APIs
// TODO - Properly write out Swagger document
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoConnect(() => {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
