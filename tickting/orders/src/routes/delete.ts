import express, { Request, Response } from "express";
import {
  validateRequest,
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@cmtickets/common";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,

  async (req: Request, res: Response) => {
    // const ticket = await Ticket.findById(req.params.id);
    // const { title, price } = req.body;
    // if (!ticket) {
    //   throw new NotFoundError();
    // }
    // if (req.currentUser!.id !== ticket.userId) {
    //   throw new NotAuthorizedError();
    // }
    // ticket.set({ title, price });
    // await ticket.save();
    // new TicketUpdatedPublisher(natsWrapper.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });
    // res.status(200).send(ticket);
  }
);

export { router as deleteOrderRouter };
