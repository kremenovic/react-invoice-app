const express = require("express");
const app = express();
const cors = require("cors");

const port = 5000;

// use middleware

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
