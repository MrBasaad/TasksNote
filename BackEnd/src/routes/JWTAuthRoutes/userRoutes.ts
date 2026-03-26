import express, { Router } from "express";
import { creatUser, getAllUsers, getUser, updateUserEmail, updateUserName, updateUserPasswd } from "@controllers/JWTAuthContrllers/userController";
const router:Router = express.Router();
// create new user
router.post('/', creatUser);
router.get('/', getAllUsers);
router.get('/:idUser', getUser);
router.put('/updateemail', updateUserEmail);
router.put('/updatename', updateUserName);
router.put('/updatepasswd', updateUserPasswd);
export default router;