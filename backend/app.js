require("dotenv").config();

const express = require("express");
const mongoDB = require("./utils/db.js");

const app = express();

app.use(express.json());

mongoDB().then(() => {

    console.log("Database connection is created")

    app.listen(process.env.PORT, () => {
        console.log(`Server is running at PORT ${process.env.PORT}`);
    });

}).catch((err) => {
    console.log("Database connect is failed")
})