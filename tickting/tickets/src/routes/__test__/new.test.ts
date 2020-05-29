import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post request", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).not.toEqual(404);
});
it("can only be accessed if the user is signed in", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).toEqual(401);
});
it("returns a status other than 401 if user signed in", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).not.toEqual(401);
});
