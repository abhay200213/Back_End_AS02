import {
  calculateTicketUrgency,
} from "../src/api/v1/services/ticketService";

describe("Ticket urgency calculation", () => {
  it("should calculate low urgency", () => {
    const result =
      calculateTicketUrgency(1);

    expect(result?.urgencyLevel).toBe(
      "Low urgency. Address when capacity allows."
    );
  });

  it("should calculate moderate urgency", () => {
    const result =
      calculateTicketUrgency(2);

    expect(result?.urgencyLevel).toBe(
      "Moderate. Schedule for attention."
    );
  });

  it("should calculate critical urgency", () => {
    const result =
      calculateTicketUrgency(6);

    expect(result?.urgencyLevel).toBe(
      "Critical. Immediate attention required."
    );
  });

  it("should return resolved urgency state", () => {
    const result =
      calculateTicketUrgency(7);

    expect(result?.urgencyLevel).toBe(
      "Minimal. Ticket resolved."
    );

    expect(result?.urgencyScore).toBe(0);
  });
});