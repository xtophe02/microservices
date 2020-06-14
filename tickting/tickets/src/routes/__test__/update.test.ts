import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/ticket";

it("return a 404 if provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "teste2", price: 20 })
    .expect(404);
});
it("returns a 401 if user not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const res = await request(app).put(`/api/tickets/${id}`).send({});
  expect(res.status).toEqual(401);
});
it("returns a 401 if user does not owns the ticket", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: 10 })
    .expect(201);
  const resUpdate = await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "teste2", price: 20 })
    .expect(401);
});
it("returns a 400 if user provides invalid title or price", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "teste", price: 10 })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 10 })
    .expect(400);
});
it("updates with valid inputs", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "teste", price: 10 })
    .expect(201);
  const resUpdate = await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "teste2", price: 10 })
    .expect(200);
  expect(resUpdate.body.title).toEqual("teste2");
});

it("publishes an event", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "teste", price: 10 })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "teste2", price: 10 })
    .expect(200);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if ticket is reserved", async () => {
  const cookie = global.signin();
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "teste", price: 10 })
    .expect(201);

  const ticket = await Ticket.findById(res.body.id);
  ticket?.set({ orderId: mongoose.Types.ObjectId().toHexString() });
  await ticket?.save();
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "teste2", price: 10 })
    .expect(400);
});
