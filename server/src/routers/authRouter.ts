import { Router, Request, Response } from "express";
import { CONFLICT, OK, INTERNAL_SERVER_ERROR } from "http-status";
import AuthService from "../services/authService";
import ApiError from "../error/apiError";

export const authRouter = Router();
const authService = new AuthService();

authRouter.post("/register", async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    username,
    password,
    email,
    role,
    certificate,
    shelter_name,
    shelter_address,
    shelter_telephone
  } = req.body;

  const user = await authService.register({
    first_name,
    last_name,
    username,
    password,
    email,
    role,
    certificate,
    shelter_name,
    shelter_address,
    shelter_telephone
  });

  if (user instanceof ApiError) {
    return res.status(CONFLICT).json(user);
  } 

  return res.status(OK).json(user);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await authService.login({
    username,
    password,
  });

  if (user instanceof ApiError) {
    return res.status(INTERNAL_SERVER_ERROR).json(user);
  } 
  
  return res.status(OK).json(user);
  
});
