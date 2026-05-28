import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import {
  calculateTicketUrgency,
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} from "../services/ticketService";
import {
  TicketPriority,
  TicketStatus,
} from "../models/ticket";

const validPriorities: TicketPriority[] = [
  "critical",
  "high",
  "medium",
  "low",
];

const validStatuses: TicketStatus[] = [
  "open",
  "in-progress",
  "resolved",
];

export const getTickets = (
  _req: Request,
  res: Response
): Response => {
  const tickets = getAllTickets();

  return res.status(HTTP_STATUS.OK).json({
    message: "Tickets retrieved",
    count: tickets.length,
    data: tickets,
  });
};

export const getTicket = (
  req: Request,
  res: Response
): Response => {
  const id = Number(req.params.id);
  const ticket = getTicketById(id);

  if (!ticket) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: "Ticket retrieved",
    data: ticket,
  });
};

export const createNewTicket = (
  req: Request,
  res: Response
): Response => {
  const { title, description, priority } = req.body;

  if (!title) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: title",
    });
  }

  if (!description) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Missing required field: description",
    });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid priority. Must be one of: critical, high, medium, low",
    });
  }

  const ticket = createTicket(
    title,
    description,
    priority
  );

  return res.status(HTTP_STATUS.CREATED).json({
    message: "Ticket created",
    data: ticket,
  });
};

export const updateExistingTicket = (
  req: Request,
  res: Response
): Response => {
  const id = Number(req.params.id);
  const existingTicket = getTicketById(id);

  if (!existingTicket) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
  }

  const { priority, status } = req.body;

  if (
    priority !== undefined &&
    !validPriorities.includes(priority)
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid priority. Must be one of: critical, high, medium, low",
    });
  }

  if (
    status !== undefined &&
    !validStatuses.includes(status)
  ) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:
        "Invalid status. Must be one of: open, in-progress, resolved",
    });
  }

  const updatedTicket = updateTicket(id, req.body);

  return res.status(HTTP_STATUS.OK).json({
    message: "Ticket updated",
    data: updatedTicket,
  });
};

export const deleteExistingTicket = (
  req: Request,
  res: Response
): Response => {
  const id = Number(req.params.id);
  const deleted = deleteTicket(id);

  if (!deleted) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: "Ticket deleted",
  });
};

export const getTicketUrgency = (
  req: Request,
  res: Response
): Response => {
  const id = Number(req.params.id);
  const urgency = calculateTicketUrgency(id);

  if (!urgency) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Ticket not found",
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: "Ticket urgency calculated",
    data: urgency,
  });
};