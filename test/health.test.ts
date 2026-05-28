import request from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpStatus";

describe("Health endpoint", () => {
  it("should return API health status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toEqual({
      status: "ok",
      message: "Support Ticket Management API is running",
    });
  });
});