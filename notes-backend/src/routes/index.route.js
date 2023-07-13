import {Router} from "express";

import authRoute from "./auth.route.js";
import noteRoute from "./note.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/notes",noteRoute)

export default router;