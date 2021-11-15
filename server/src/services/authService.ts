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
    certificate?: string | null;
    shelter_name?: string | null;
    shelter_address?: string | null;
    shelter_telephone?: string | null;
  }) {
    const hashedPassword = await bcrypt.hash(options.password, 10);

    let user;

    const isVerified = options.role === "USER" ? 1 : 0;

    try {
      user = await prisma.user.create({
        data: {
          first_name: options.first_name,
          last_name: options.last_name,
          username: options.username,
          password: hashedPassword,
          email: options.email,
          role: options.role,
          certificate: options.certificate,
          shelter_name: options.shelter_name,
          shelter_address: options.shelter_address,
          shelter_telephone: options.shelter_telephone,
          isVerified: isVerified
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
