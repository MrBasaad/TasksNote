import express, { Router } from "express";
import { getUserId } from "@controllers/JWTAuthContrllers/userIdController";
const router:Router = express.Router();
// create new user
router.post('/', getUserId);
export default router;