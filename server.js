const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./config/db");
const userRoutes = require("./routes/user");
const clientRoutes = require("./routes/clients");
const studiosRoutes = require("./routes/studios");
const bookingRoutes = require("./routes/bookings");
const albumRoutes = require("./routes/albums");
const citiesRoutes = require("./routes/cities");
const categoriesRoutes = require("./routes/categories");
const razorpayRoutes = require("./routes/razorpay");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

dbConnection
  .dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Picture Perfect Project");
});

app.use("/api/user", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/cities", citiesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/studios", studiosRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/studios/albums", albumRoutes);
app.use("/api/razorpay/", razorpayRoutes);
