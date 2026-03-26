import express, { Router } from "express";
import { allData } from "@controllers/DataTablesContrllers/showAllData";
const router:Router = express.Router();
router.post('/', allData);
export default router;