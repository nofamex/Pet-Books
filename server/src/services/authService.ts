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
    username: string;
    password: string;
    role: Role;
    full_name: string;
    email: string;
    birthday: Date;
  }) {
    const hashedPassword = await bcrypt.hash(options.password, 10);

    let user;

    try {
      user = await prisma.user.create({
        data: {
          username: options.username,
          password: hashedPassword,
          role: options.role,
          full_name: options.full_name,
          email: options.email,
          birthday: options.birthday,
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
