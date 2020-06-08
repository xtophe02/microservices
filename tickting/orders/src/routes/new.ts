import express, { Request, Response } from "express";
import { requireAuth } from "@cmtickets/common";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  // const { title, price } = req.body;
  // const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
  // //THE SAVE AND PUBLIHSHER SHOULD BE DONE IN MONGODB TRANSACTION
  // await ticket.save();
  // await new TicketCreatedPublisher(natsWrapper.client).publish({
  //   id: ticket.id,
  //   title: ticket.title,
  //   price: ticket.price,
  //   userId: ticket.userId,
  // });
  // res.status(201).send(ticket);
});

export { router as createOrderRouter };
