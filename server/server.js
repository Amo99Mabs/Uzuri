const express = require("express");
const app = express();

//Middleware
app.use(express.json());

//Test route
app.get("/", (req, res) => {
  res.send("Uzuri backend running");
});

//Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
