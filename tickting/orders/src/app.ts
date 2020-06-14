import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@cmtickets/common";
import {
  createOrderRouter,
  showOrderRouter,
  deleteOrderRouter,
} from "./routes";

const app = express();
app.set("trust proxy", true); //behind nginx

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);
app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
