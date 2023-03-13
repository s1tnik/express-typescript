import express from "express";
import * as dotenv from "dotenv";
import { analyzeController } from "./controllers/analyzeController";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 5072;

app.use(express.json());

/** RULES OF OUR API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/v1/analyze", analyzeController);

/** Error handling */
app.use((req, res) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
