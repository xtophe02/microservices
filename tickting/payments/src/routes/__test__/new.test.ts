import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";
import { OrderStatus } from "@cmtickets/common";

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({ token: "test", orderId: mongoose.Types.ObjectId().toHexString() })
    .expect(404);
});

it("returns a 401 when purchasing order that doesnt belong to the user", async () => {
  const user = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: user,
    status: OrderStatus.Created,
    price: 10,
    version: 0,
  });
  await order.save();
  const res = await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({ token: "test", orderId: order.id });
  expect(res.status).toEqual(401);
});
it("returns a 400 when purchasing a cancelled order", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: id,
    status: OrderStatus.Cancelled,
    price: 10,
    version: 0,
  });
  await order.save();
  const res = await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(id))
    .send({ token: "test", orderId: order.id });
  expect(res.status).toEqual(400);
});
