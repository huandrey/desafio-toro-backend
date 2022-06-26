import express from "express";

import "reflect-metadata";
import "./database";
import { accountRoutes } from "./routes/accounts.routes";
import { authenticateRoutes } from "./routes/authenticate.routes";
import { userRoutes } from "./routes/users.routes";

const app = express();
app.use(express.json());

app.use("/session", authenticateRoutes);
app.use("/users", userRoutes);
app.use("/account", accountRoutes);

app.listen(8080, () => {
  console.log("Server is running in PORT 8080");
});
