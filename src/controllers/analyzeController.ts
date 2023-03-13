import express from "express";
import { analyzeRepository } from "../utils/analyzeRepository";

export const analyzeController = express.Router();

analyzeController.post("/framework", async (req, res) => {
  const { SourceType, Link } = req.body;
  try {
    const result = await analyzeRepository(SourceType, Link);
    res.status(200).json(result);
  } catch ({ message }) {
    res.status(400).json({ message: message ?? "error" });
  }
});
