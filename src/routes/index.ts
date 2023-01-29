import { Router } from "express";

import { categoriesRoutes } from "./categories.router";
import { specificationsRouter } from "./specifications.router";
import { usersRoutes } from "./users.router";

const router = Router();

router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRouter);

export { router };
