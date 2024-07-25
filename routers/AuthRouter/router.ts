import { Router } from "express";
import SignUpHandler  from "./Handlers/SignUpHandler";
import LoginHandler from "./Handlers/LoginHandler";
import LogoutHandler from "./Handlers/LogoutHandler";

const router = Router();
router.post('/signup', SignUpHandler);
router.post('/login', LoginHandler);
router.post('/logout', LogoutHandler);

export default router;