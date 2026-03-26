import express, { Router } from "express";
import { refreshToken } from "@controllers/JWTAuthContrllers/refresTokenController";
const router:Router = express.Router();
// fun for singin 
router.post("/", refreshToken);
export default router;