import express, { Router } from "express";
import { sendTablerow, updateTablerow ,deleteTablerow} from "@controllers/DataTablesContrllers/rowDataTable";
const router:Router = express.Router();
router.post('/', sendTablerow);
router.put('/', updateTablerow);
router.delete('/',deleteTablerow);
export default router;