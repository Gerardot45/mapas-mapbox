const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const {connectDB} = require('./config/db')

//load env vars

dotenv.config({ path: "./config/config.env" });

connectDB()

const app = express();

app.use(express.json())

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/stores', require('./routes/stores'))

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode and port ${PORT}`
  );
});
