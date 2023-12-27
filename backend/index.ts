import express from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! It's working🚀🔥🚀🔥🚀🔥🚀🔥🚀🔥");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
