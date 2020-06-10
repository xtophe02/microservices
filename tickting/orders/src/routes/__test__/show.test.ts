import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@cmtickets/common";

const createTicket = async () => {
  const ticket = Ticket.build({ title: "test", price: 10 });
  await ticket.save();
  return ticket;
};

it("fetchs orders for an particular user", async () => {
  const user2 = global.signin();
  const user1 = global.signin();
  const ticket1 = await createTicket();
  const ticket2 = await createTicket();
  const ticket3 = await createTicket();

  await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  const { body: order1 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: order2 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  const res = await request(app)
    .get("/api/orders")
    .set("Cookie", user2)
    .send({})
    .expect(200);

  expect(res.body.length).toEqual(2);
  expect(res.body[0].id).toEqual(order1.id);
  expect(res.body[1].id).toEqual(order2.id);
});

it("fetchs the order", async () => {
  const ticket = await createTicket();
  const user = global.signin();
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${res.body.id}`)
    .set("Cookie", user)
    .send({})
    .expect(200);
});
it("fetchs the order not authorized", async () => {
  const ticket = await createTicket();

  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(401);
});
