const express = require("express");
const dotenv = require("dotenv").config();
const aiRoutes = require("./routes/aiRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/myai", aiRoutes);

const port = 3000;
app.listen(port, () => {
  console.log("port is running on ");
});
