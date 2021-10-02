import { Router, Request, Response } from "express";
import { CONFLICT, OK, INTERNAL_SERVER_ERROR } from "http-status";
import AuthService from "../services/authService";
import ApiError from "../error/apiError";

export const authRouter = Router();
const authService = new AuthService();

authRouter.post("/register", async (req: Request, res: Response) => {
  const {
    username,
    password,
    role,
    full_name,
    email,
    doctor_certificate,
    store_name,
  } = req.body;

  const user = await authService.register({
    username,
    password,
    role,
    full_name,
    email,
    doctor_certificate,
    store_name,
  });

  if (user instanceof ApiError) {
    res.status(CONFLICT).json(user);
  } else {
    res.status(OK).json(user);
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await authService.login({
    username,
    password,
  });

  if (user instanceof ApiError) {
    res.status(INTERNAL_SERVER_ERROR).json(user);
  } else {
    res.status(OK).json(user);
  }
});
