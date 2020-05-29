import express, { Request, Response } from "express";
import { RequestValidationError, requireAuth } from "@cmtickets/common";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  async (req: Request, res: Response) => {
    res.status(200).send({});
  }
);

export { router as createTicketRouter };
