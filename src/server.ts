import express from "express";
import { analyzeController } from "./controllers/analyzeController";

const app = express();
const port = 5072;

app.use(express.json());

app.use("/api/v1/analyze", analyzeController);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
