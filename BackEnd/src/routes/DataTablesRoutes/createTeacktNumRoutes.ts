import express, { Router } from "express";
import { createTikectNum, getteckts } from "@controllers/DataTablesContrllers/createTeacketNumController";
const router:Router = express.Router();
router.post('/', createTikectNum);
router.get('/', getteckts);
export default router;