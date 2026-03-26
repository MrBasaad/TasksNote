// import express from "express";
// import { refreshToken } from "./refresTokenController.ts";

import type { UserNamespace } from "~/src/types/userPayload";
import { isAuth } from "./isAuth";
import type { Request, Response } from "express";
export const protectedfun = async (req:Request, res:Response) => {
    try {
        const {userName} = await isAuth(req) as UserNamespace.UserFromObjPayload;
        if (!userName) {
            return res.send({ message: "This is protected data"  });
        } else {
            return res.send({ message: "This key not working anymore" });

        }
    } catch (error) {
        return res.json({ error: error });
    }
} 