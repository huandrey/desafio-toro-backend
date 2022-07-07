import { Router } from "express";

import { accountRoutes } from "@shared/infra/http/routes/accounts.routes";
import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";
import { transactionRoutes } from "@shared/infra/http/routes/transactions.routes";
import { userRoutes } from "@shared/infra/http/routes/users.routes";

const router = Router();

router.use("/session", authenticateRoutes);
router.use("/users", userRoutes);
router.use("/account", accountRoutes);
router.use("/spb/events", transactionRoutes);

export { router };
