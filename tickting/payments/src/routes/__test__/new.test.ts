import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";
import { OrderStatus } from "@cmtickets/common";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";

//remove .old from stripe moks
// jest.mock("../../stripe");

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "tok_visa",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
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
    .send({ token: "tok_visa", orderId: order.id });
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
    .send({ token: "tok_visa", orderId: order.id });
  expect(res.status).toEqual(400);
});

it("returns 204 with valid inputs", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: id,
    status: OrderStatus.Created,
    price,
    version: 0,
  });
  await order.save();
  const res = await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(id))
    .send({ token: "tok_visa", orderId: order.id })
    .expect(201);

  // const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  // expect(chargeOptions.source).toEqual("tok_visa");
  // expect(chargeOptions.amount).toEqual(10 * 100);
  // expect(chargeOptions.currency).toEqual("eur");

  const stripeCharges = await stripe.charges.list({ limit: 50 });
  const stripeCharge = stripeCharges.data.find((charge) => {
    return charge.amount === price * 100;
  });

  expect(stripeCharge).toBeDefined();
  expect(stripeCharge?.currency).toEqual("eur");

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id,
  });
  expect(payment).not.toBeNull();
});
