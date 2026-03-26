
import express, { Router } from "express";
import {me} from "@controllers/JWTAuthContrllers/meController";
const router:Router = express.Router();
router.get("/", me);
export default router;