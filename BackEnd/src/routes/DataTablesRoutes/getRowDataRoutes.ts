import express, { Router } from "express";
import { getTablerow } from "@controllers/DataTablesContrllers/getRowData";
const router:Router = express.Router();
router.post('/', getTablerow);
export default router;