const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const PORT = 5002;
const path = require("path");
const cors = require("cors");

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/movies", require("./routers/api/movies"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
