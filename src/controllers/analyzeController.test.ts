import request from "supertest";
import express from "express";
import { analyzeRepository } from "../utils/analyzeRepository";
import { analyzeController } from "./analyzeController";

jest.mock("../utils/analyzeRepository", () => ({
  analyzeRepository: jest.fn(),
}));

describe("analyzeController", () => {
  const app = express();
  app.use(express.json());
  app.use("/api/v1/analyze", analyzeController);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns the project information if analysis is successful", async () => {
    const mockResult = { CompatibilityVersion: " Xcode 14.0" };
    (analyzeRepository as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app)
      .post("/api/v1/analyze/framework")
      .send({ sourceType: "SomeSourceType", link: "SomeLink" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
  });

  it("returns an error if analysis fails", async () => {
    const mockError = new Error("Analyze error");
    (analyzeRepository as jest.Mock).mockRejectedValue(mockError);

    const response = await request(app)
      .post("/api/v1/analyze/framework")
      .send({ sourceType: "SomeSourceType", link: "SomeLink" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Analyze error" });
  });
});
