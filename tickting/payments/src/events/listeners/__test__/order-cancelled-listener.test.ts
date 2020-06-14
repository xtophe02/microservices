import { OrderCancelledListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import {
  OrderCreatedEvent,
  OrderStatus,
  OrderCancelledEvent,
} from "@cmtickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
  });
  await order.save();

  const data: OrderCancelledEvent["data"] = {
    version: 1,
    id: order.id,
    status: order.status,
    ticket: {
      id: mongoose.Types.ObjectId().toHexString(),
    },
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg, order };
};

it("updates the status of the order", async () => {
  const { listener, data, msg, order } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(order.id);
  updatedOrder?.set({ status: OrderStatus.Cancelled });

  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});
it("acks a message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

// it("publishs a ticket updated event", async () => {
//   const { listener, data, msg } = await setup();
//   await listener.onMessage(data, msg);
//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });
