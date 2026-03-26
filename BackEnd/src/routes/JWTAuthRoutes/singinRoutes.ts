import express, { Router } from "express";
import { singin } from "@controllers/JWTAuthContrllers/singinController";
const router:Router = express.Router();
// fun for singin 
router.post("/", singin);
export default router;