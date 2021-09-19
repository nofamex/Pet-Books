import express, { Router } from "express";

export const app = express();
const apiRouter = Router();
const v1 = Router();

// Middleware goes here
app.use(express.json(), express.urlencoded({ extended: true }));

// Routing goes here
app.use("/api", apiRouter);
app.use("/v1", v1);
