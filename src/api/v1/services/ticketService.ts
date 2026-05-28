import { tickets } from "../../../data/tickets";
import {
  Ticket,
  TicketPriority,
} from "../models/ticket";

const PRIORITY_SCORES: Record<TicketPriority, number> = {
  low: 10,
  medium: 20,
  high: 30,
  critical: 50,
};

export const getAllTickets = (): Ticket[] => {
  return tickets;
};

export const getTicketById = (
  id: number
): Ticket | undefined => {
  return tickets.find((ticket) => ticket.id === id);
};

export const createTicket = (
  title: string,
  description: string,
  priority: TicketPriority
): Ticket => {
  const newTicket: Ticket = {
    id: tickets.length + 1,
    title,
    description,
    priority,
    status: "open",
    createdAt: new Date().toISOString(),
  };

  tickets.push(newTicket);

  return newTicket;
};

export const updateTicket = (
  id: number,
  updatedFields: Partial<Ticket>
): Ticket | undefined => {
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return undefined;
  }

  Object.assign(ticket, updatedFields);

  return ticket;
};

export const deleteTicket = (
  id: number
): boolean => {
  const index = tickets.findIndex(
    (ticket) => ticket.id === id
  );

  if (index === -1) {
    return false;
  }

  tickets.splice(index, 1);

  return true;
};

export const calculateTicketUrgency = (
  id: number
) => {
  const ticket = tickets.find(
    (ticket) => ticket.id === id
  );

  if (!ticket) {
    return undefined;
  }

  const ticketAge = Math.floor(
    (
      Date.now() -
      new Date(ticket.createdAt).getTime()
    ) /
      (1000 * 60 * 60 * 24)
  );

  if (ticket.status === "resolved") {
    return {
      id: ticket.id,
      title: ticket.title,
      priority: ticket.priority,
      status: ticket.status,
      createdAt: ticket.createdAt,
      ticketAge,
      urgencyScore: 0,
      urgencyLevel:
        "Minimal. Ticket resolved.",
    };
  }

  const baseScore =
    PRIORITY_SCORES[
      ticket.priority as TicketPriority
    ];

  const urgencyScore =
    baseScore + ticketAge * 5;

  let urgencyLevel = "";

  if (urgencyScore >= 80) {
    urgencyLevel =
      "Critical. Immediate attention required.";
  } else if (urgencyScore >= 51) {
    urgencyLevel =
      "High urgency. Prioritize resolution.";
  } else if (urgencyScore >= 30) {
    urgencyLevel =
      "Moderate. Schedule for attention.";
  } else {
    urgencyLevel =
      "Low urgency. Address when capacity allows.";
  }

  return {
    id: ticket.id,
    title: ticket.title,
    priority: ticket.priority,
    status: ticket.status,
    createdAt: ticket.createdAt,
    ticketAge,
    urgencyScore,
    urgencyLevel,
  };
};