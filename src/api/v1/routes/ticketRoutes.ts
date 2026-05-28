import { Router } from "express";
import {
  createNewTicket,
  deleteExistingTicket,
  getTicket,
  getTicketUrgency,
  getTickets,
  updateExistingTicket,
} from "../controllers/ticketController";

const router = Router();

router.get("/", getTickets);

router.get("/:id", getTicket);

router.get("/:id/urgency", getTicketUrgency);

router.post("/", createNewTicket);

router.put("/:id", updateExistingTicket);

router.delete("/:id", deleteExistingTicket);

export default router;