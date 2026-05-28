import request from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpStatus";

describe("Health endpoint", () => {
  it("should return API health status", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body.status).toBe("OK");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body.version).toBe("1.0.0");
  });
});