import express from "express";

import "./database";
import { userRoutes } from "./routes/users.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(8080, () => {
  console.log("Server is running in PORT 8080");
});
