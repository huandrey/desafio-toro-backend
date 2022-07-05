import "express-async-errors";

import "reflect-metadata";
import "./database";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { accountRoutes } from "./routes/accounts.routes";
import { authenticateRoutes } from "./routes/authenticate.routes";
import { transactionRoutes } from "./routes/transactions.routes";
import { userRoutes } from "./routes/users.routes";
import { AppError } from "./shared/errors/AppError";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/session", authenticateRoutes);
app.use("/users", userRoutes);
app.use("/account", accountRoutes);
app.use("/spb/events", transactionRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log("Server is running in PORT 3333");
});
