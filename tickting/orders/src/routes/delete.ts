import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from "@cmtickets/common";

import { Order } from "../models/order";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,

  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    res.status(204).send(order);

    //publish event canceled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      ticket: {
        id: order.ticket.id,
      },
    });
  }
);

export { router as deleteOrderRouter };
