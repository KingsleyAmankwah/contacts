import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/config";
import router from "./routes";
import ErrorHandler from "./middleware/errorHandler";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json()).use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World! It's working🚀🔥🚀🔥🚀🔥🚀🔥🚀🔥");
});

app.use(router);

app.use(ErrorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Server running at http://localhost:${port}`);
});
