import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../errors";
import { User } from "../models/user";
import { validateRequest } from "../middlwares/validate-request";
import { Password } from "../utils/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Please to provide an email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Please to provide a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const exitingUser = await User.findOne({ email });
    if (!exitingUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordsMatch = await Password.compare(
      exitingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    const userJwt = jwt.sign(
      { id: exitingUser.id, email: exitingUser.email },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(200).send(exitingUser);
  }
);

export { router as signinRouter };
