import express, { Router } from "express";
import { getCountDataFalse,  } from "@controllers/DataTablesContrllers/countDataDone";
const router:Router = express.Router();
router.post('/', getCountDataFalse);
export default router;