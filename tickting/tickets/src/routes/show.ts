import express, { Request, Response } from "express";
import { validateRequest, requireAuth, NotFoundError } from "@cmtickets/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }
    res.send(ticket);
  }
);
router.get(
  "/api/tickets",

  async (req: Request, res: Response) => {
    const tickets = await Ticket.find();

    if (!tickets) {
      throw new NotFoundError();
    }
    res.send(tickets);
  }
);

export { router as showTicketRouter };
