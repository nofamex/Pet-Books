import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "http-status";
import { unauthorizedAccesError } from "../error/serviceError";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(UNAUTHORIZED).json(unauthorizedAccesError());
    return;
  }

  const token = bearer.split(" ")[1];
  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY || "secret");

  req.body.data = verified;
  next();
};
