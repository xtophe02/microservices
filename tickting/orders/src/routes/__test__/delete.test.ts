import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@cmtickets/common";
import { natsWrapper } from "../../nats-wrapper";

const createTicket = async () => {
  const ticket = Ticket.build({
    title: "test",
    price: 10,
    id: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  return ticket;
};

it("marks an order as canceled", async () => {
  const user = global.signin();
  const ticket = await createTicket();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${res.body.id}`)
    .set("Cookie", user)
    .send({})
    .expect(204);

  const deletedOrder = await Order.findById(res.body.id);

  expect(deletedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order canceled event", async () => {
  const user = global.signin();
  const ticket = Ticket.build({
    title: "test",
    price: 10,
    id: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${res.body.id}`)
    .set("Cookie", user)
    .send({})
    .expect(204);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
