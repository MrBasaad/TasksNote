import type { JwtPayload } from "jsonwebtoken";
import { isAuth } from "./isAuth";
import type { Request, Response } from "express";
import type { UserNamespace } from "~/src/types/userPayload";



export const me = async (req:Request, res:Response) => {
  try {
    const user:UserNamespace.UserFromObjPayload  = await isAuth(req) as UserNamespace.UserFromObjPayload;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }else{
      return res.json({userId: user['userId'],
      userName: user['userName']});
    }
  } catch (error:unknown) {
      return res.json({ error: error });
  }
};
