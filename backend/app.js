require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoDB = require("./utils/db.js");
const productRoute = require("./routes/productRoute.js");
const userRoutes = require("./routes/userRoute.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/products", productRoute);
app.use("/users", userRoutes);

mongoDB()
  .then(() => {
    console.log("Database connection is created");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connect is failed");
  });
