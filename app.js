//const http = require('http');

// MongoDB
const mongoConnect = require("./util/mongodb-database").mongoConnect;

const path = require("path");

// APIs
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// TLS
const https = require("https");
const fs = require("fs");

const hostname = "0.0.0.0";
const port = 8080;

app.use(bodyParser.json()); // Parse request body
app.use(express.static(path.join(__dirname, "public"))); // TODO - Learn purpose

app.use(cors()); // Enable CORS

const transactionRoutes = require("./routes/transaction");

app.use("/v1", transactionRoutes);

// Swagger documentation for APIs
// TODO - Properly write out Swagger document
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Implement TLS on server
// TODO - Use your own certs
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "./mycert/privkey.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./mycert/bundle.pem")),
};
const sslServer = https.createServer(sslOptions, app);

mongoConnect(() => {
  sslServer.listen(port, () => {
    //console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Server running at https://${hostname}:${port}/`);
  });
});
