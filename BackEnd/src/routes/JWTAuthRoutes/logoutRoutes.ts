import express, { Router } from "express";
import { logout } from "@controllers/JWTAuthContrllers/logoutController";
const router:Router = express.Router();
// fun for singin 
router.post("/", logout);
export default router;