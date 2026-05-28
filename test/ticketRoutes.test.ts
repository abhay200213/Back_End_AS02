import request from "supertest";
import app from "../src/app";
import { HTTP_STATUS } from "../src/constants/httpStatus";

describe("Ticket Routes", () => {
  it("should get all tickets", async () => {
    const response = await request(app)
      .get("/api/v1/tickets");

    expect(response.status).toBe(
      HTTP_STATUS.OK
    );

    expect(response.body.message).toBe(
      "Tickets retrieved"
    );

    expect(response.body).toHaveProperty(
      "data"
    );
  });

  it("should get a ticket by id", async () => {
    const response = await request(app)
      .get("/api/v1/tickets/1");

    expect(response.status).toBe(
      HTTP_STATUS.OK
    );

    expect(response.body.data.id).toBe(1);
  });

  it("should return 404 for missing ticket", async () => {
    const response = await request(app)
      .get("/api/v1/tickets/999");

    expect(response.status).toBe(
      HTTP_STATUS.NOT_FOUND
    );

    expect(response.body.message).toBe(
      "Ticket not found"
    );
  });

  it("should create a new ticket", async () => {
    const response = await request(app)
      .post("/api/v1/tickets")
      .send({
        title: "Test Ticket",
        description: "Testing creation",
        priority: "high",
      });

    expect(response.status).toBe(
      HTTP_STATUS.CREATED
    );

    expect(response.body.data.title).toBe(
      "Test Ticket"
    );
  });

  it("should validate missing title", async () => {
    const response = await request(app)
      .post("/api/v1/tickets")
      .send({
        description: "Missing title",
        priority: "high",
      });

    expect(response.status).toBe(
      HTTP_STATUS.BAD_REQUEST
    );

    expect(response.body.message).toBe(
      "Missing required field: title"
    );
  });

  it("should update a ticket", async () => {
    const response = await request(app)
      .put("/api/v1/tickets/1")
      .send({
        status: "resolved",
      });

    expect(response.status).toBe(
      HTTP_STATUS.OK
    );

    expect(response.body.data.status).toBe(
      "resolved"
    );
  });

  it("should delete a ticket", async () => {
    const response = await request(app)
      .delete("/api/v1/tickets/2");

    expect(response.status).toBe(
      HTTP_STATUS.OK
    );

    expect(response.body.message).toBe(
      "Ticket deleted"
    );
  });
});