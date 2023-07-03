import {Router} from "express"

import {LogIn, LogOut, SignUp, ResetPassword, GetProfile} from "../controllers/auth.controller.js";
import {isLoggedIn, authorize} from "../middlewares/auth.middleware.js";

import AuthRoles from "../utils/authRoles.util.js";


const router = Router();

router.post("/signUp", SignUp);
router.post("/logIn", LogIn);
router.post("/logOut", LogOut);
router.post("/password/reset", isLoggedIn, ResetPassword);

router.get("/profile", isLoggedIn, GetProfile);


export default router;