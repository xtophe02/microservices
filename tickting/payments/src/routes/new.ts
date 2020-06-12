import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
  BadRequestError,
} from "@cmtickets/common";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("need token from Stripe"),
    body("orderId").not().isEmpty().withMessage("need orderId"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }

    await stripe.charges.create({
      amount: order.price * 100,
      currency: "eur",
      source: token,
    });
    res.send({ success: true });
  }
);

export { router as createPaymentRouter };
