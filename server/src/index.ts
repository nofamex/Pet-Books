import { app } from "./config";
import { Request, Response } from "express";

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to pet-books api");
});

app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
