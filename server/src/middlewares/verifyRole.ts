import { Request, Response, NextFunction } from "express";
import { NOT_FOUND, UNAUTHORIZED } from "http-status";
import {
  noUsernameFoundError,
  unauthorizedRoleError,
} from "../error/serviceError";
import { prisma } from "../lib/prisma";

async function verifyRole(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: { username: req.body.data.username },
    });

    if (!user) {
      res.status(NOT_FOUND).json(noUsernameFoundError());
      return;
    }

    if (user.role !== role) {
      res.status(UNAUTHORIZED).json(unauthorizedRoleError());
      return;
    }

    next();
  };
}
