const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./server/routes/products");    
     
const app = express(); 
const PORT = 5004;   
 
app.use(cors());
app.use(express.json()); 
app.use("/api/products", productRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/uzuri", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,  
  }) 
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running on port ${PORT"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
