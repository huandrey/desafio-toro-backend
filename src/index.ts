import express from "express";

import "reflect-metadata";
import "./database";
import cors from "cors";

import { accountRoutes } from "./routes/accounts.routes";
import { authenticateRoutes } from "./routes/authenticate.routes";
import { transactionRoutes } from "./routes/transactions.routes";
import { userRoutes } from "./routes/users.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/session", authenticateRoutes);
app.use("/users", userRoutes);
app.use("/account", accountRoutes);
app.use("/spb/events", transactionRoutes);

app.listen(3333, () => {
  console.log("Server is running in PORT 8080");
});
