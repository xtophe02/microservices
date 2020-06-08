import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@cmtickets/common";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,

  async (req: Request, res: Response) => {
    // const ticket = await Ticket.findById(req.params.id);
    // if (!ticket) {
    //   throw new NotFoundError();
    // }
    // res.send(ticket);
  }
);
router.get(
  "/api/orders",

  async (req: Request, res: Response) => {
    //   const tickets = await Ticket.find();
    //   if (!tickets) {
    //     throw new NotFoundError();
    //   }
    //   res.send(tickets);
  }
);

export { router as showOrderRouter };
