# Read Me
## 1. Introduction
This repository is meant for a Backend application for an expense tracker application.

**Link for frontend web application:** https://github.com/nahwu/expense-app-react

## 2. Purpose
While there are many expense trackers out there. The good ones are mostly behind a paywall. 

`Knowledge` or `awareness` of your own expenses is very crucial to our personal financial health for both the present and the future.

For example, it only takes 20 average medium-sized spending (e.g. $50) within a month to reach 4 figure expense (>= $1000) for the month.
It's not uncommon to know someone who spends beyond their means, especially when one suddenly have more income than before. 

The goal of this project is to begin with `expense awareness` and then expand onwards to  `expense budgeting` >> `saving & networth projection` >> `retirement planning`


## 3. Supported features
1. Expenses info - Date, item description, expense category, payer, receiver, amount
1. Connection to MongoDB
1. **Feature:** API for creating new transaction
1. **Feature:** API for retrieving all transactions
1. **Feature:** API for dynamic transaction search support (optional search filters, sort, sort direction, partial match, case sensitivity)
1. **Feature:** API for aggregation of transactions (for descriptive analytics e.g. charts)
    1. Summation of amount, by category. Optional date range filter
1. **Feature:** Add support for delete Transaction API
1. **Feature:** Allow data import from CSV file
    1. CSV import from You Need a Budget (YNAB). User need to delete following columns - Flag, Check Number, Cleared
1. Added in Dockerfile for this application
1. Added in Docker Compose file to include MongoDB deployment + this backend application
1. Added TLS support


## 4. Development Roadmap
1. **Feature:** Add support for edit Transaction API
1. **Feature:** Add support for list, create, edit, delete Expense Category API
1. **Feature:** Add support for income
1. **Feature:** Add support for list, create, edit, delete Expense Payer API
1. **Feature:** Add support for list, create, edit, delete Expense Receiver API
1. **Feature:** Allow data import from CSV file
    1. Flexible field-name remapping for data import/export
    1. Allow CSV file upload via multipart request
1. **Feature:** Allow data export to CSV file
1. Add in pagination (page + page size) for results
1. **Feature:** Investment tracking
1. **Feature:** Account login
1. **Feature:** Account creation
1. **Feature:** Multi accounts visibility for family sharing
1. **Feature:** Upload and attach image to expense
1. Add in DB fields for dateCreated, userCreated
    1. Sort by date DESC, then date_created DESC. to ensure that the newest date stays at the top
1. Properly do Swagger documentation (OpenAPI 3)
1. Do different env (1 for dev. 1 for production)
1. For personal usage & cloud data storage, consider switching to embedded database or simple "database" where it can be hosted on Google Drive or Dropbox


# X. OPTIONAL - Developers only

### X1. To run NodeJS application
    
    node app.js

### X2. CSV file for data import.
Name & place desired CSV file `./Register.csv` in root folder of application. 

Refer to `controllers/csvImport.js` for business logic details.

### X3. Build, push, export Docker image
- Build Docker image

        docker build . -t nahwu2/expense-app-backend:0.1

- Upload Docker image to Docker Registry

        docker push nahwu2/expense-app-backend:0.1

- Export Docker image as a file. Normally used when there is no Internet at the deployment location. If on Windows, use this command with Git Bash.

        docker save nahwu2/expense-app-backend:0.1 | gzip > exported_expense_app_backend_0_1.tar.gz

- Run Docker container via docker run method

        docker run --name expense-app-backend -p 8080:8080 -d nahwu2/expense-app-backend:0.1


### X4. To remove TLS support from backend server
Open app.js and change from

    const https = require("https");
    const fs = require("fs");

    const sslOptions = {
        key: fs.readFileSync(path.join(__dirname, "./mycert/privkey.pem")),
        cert: fs.readFileSync(path.join(__dirname, "./mycert/bundle.pem")),
    };
    const sslServer = https.createServer(sslOptions, app);

    mongoConnect(() => {
        sslServer.listen(port, () => {
            console.log(`Server running at https://${hostname}:${port}/`);
        });
    });

to

    mongoConnect(() => {
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    });


### X5. Redo dependencies (package.json)
1. (Optional) Delete package.json and package-lock.json
2. Swagger UI Express

        npm install swagger-ui-express -S

3. MongoDB dependency

        npm install --save mongodb

4. csv dependency

        npm install --save csv
