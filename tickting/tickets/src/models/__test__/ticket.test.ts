import { Ticket } from "../../models/ticket";
import request from "supertest";
import { app } from "../../app";

it("implements optimistic concurrency control", async (done) => {
  const ticket = Ticket.build({
    price: 10,
    title: "test",
    userId: "1",
  });

  await ticket.save();

  const ticket1 = await Ticket.findById(ticket.id);
  const ticket2 = await Ticket.findById(ticket.id);

  ticket1?.set({ price: 100 });
  ticket2?.set({ price: 1000 });

  await ticket1?.save();

  try {
    await ticket2?.save();
  } catch (error) {
    return done();
  }
  throw new Error("Should not reach this point");
});

it("icrements the version number on multiple saves", async () => {
  const user = global.signin();
  const ticket = await request(app)
    .post("/api/tickets")
    .set("Cookie", user)
    .send({ title: "test", price: 10 })
    .expect(201);

  const updatedTicket = await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set("Cookie", user)
    .send({ title: "test", price: 100 })
    .expect(200);

  expect(updatedTicket.body.version).toEqual(1);
});
