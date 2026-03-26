import express, { Router } from "express";
import { protectedfun } from "@controllers/JWTAuthContrllers/protectecController";
const router:Router = express.Router();
// fun for singin 
router.post("/", protectedfun);
export default router;