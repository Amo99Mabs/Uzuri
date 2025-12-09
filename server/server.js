const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//Middleware
app.use(express.json());

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

//Test route
app.get("/", (req, res) => {
  res.send("Uzuri backend running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//Start server
const PORT = 5005;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
