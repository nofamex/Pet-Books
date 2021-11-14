import { prisma } from "../lib/prisma";
import { Role } from ".prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  noUsernameFoundError,
  usernameAlreadyExistError,
  wrongPasswordError,
} from "../error/serviceError";

export default class AuthService {
  async register(options: {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    role: Role;
  }) {
    const hashedPassword = await bcrypt.hash(options.password, 10);

    let user;

    try {
      user = await prisma.user.create({
        data: {
          first_name: options.first_name,
          last_name: options.last_name,
          username: options.username,
          password: hashedPassword,
          email: options.email,
          role: options.role,
        },
      });
    } catch (error) {
      return usernameAlreadyExistError();
    }

    return user;
  }

  async login(options: { username: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { username: options.username },
    });

    if (!user) {
      return noUsernameFoundError();
    }

    const verified = await bcrypt.compare(options.password, user.password);

    if (!verified) {
      return wrongPasswordError();
    }

    const token = jwt.sign(user, process.env.JWT_SECRET || "secret", {
      expiresIn: "3h",
    });

    return token;
  }
}
