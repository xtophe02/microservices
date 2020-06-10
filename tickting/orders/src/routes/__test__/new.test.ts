import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@cmtickets/common";
import { natsWrapper } from "../../nats-wrapper";

it("returns an error if ticket does not exist", async () => {
  const ticketId = mongoose.Types.ObjectId();
  request(app)
    .post("/api/orders/")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});
it("returns an error if ticket reserved", async () => {
  const ticket = Ticket.build({ title: "test", price: 10 });
  await ticket.save();
  const order = Order.build({
    userId: "1",
    ticket,
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});
it("returns a ticket", async () => {
  const ticket = Ticket.build({ title: "test", price: 10 });
  await ticket.save();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
  // console.log(res.body);
  expect(res.body.ticket.title).toEqual("test");
});

it("emits an order created event", async () => {
  const user = global.signin();
  const ticket = Ticket.build({ title: "test", price: 10 });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
