import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({});
  expect(404);
});
it("returns the ticket if found", async () => {
  const title = "concert";
  const price = 20;
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price });
  expect(201);

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({});

  expect(ticketRes.body.title).toEqual(title);
});
