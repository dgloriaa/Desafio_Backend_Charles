require("dotenv").config();
const mongoose = require("mongoose");
const server = require("./src/server");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

async function startServer() {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB connected");

    server.listen(8080, () => {
      console.log("Server listening on port 8080");
    });
  } catch (err) {
    console.error("DB Error", err);
  }
}

startServer();
