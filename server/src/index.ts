import { app } from "./config";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to pet-books api");
});

app.get("/user", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  await prisma.user.create({
    data: {
      username: "user",
    },
  });
  const allUsers = await prisma.user.findMany();
  res.status(200).json(allUsers);
});

app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
