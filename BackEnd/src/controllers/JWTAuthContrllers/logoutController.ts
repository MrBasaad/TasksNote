// import express from "express";
// import cookieParser from "cookie-parser";
import pool from "@models/db";
import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";
import type { QueryResult } from "pg";
import { UserNamespace } from "~/src/types/userPayload";
export const logout = async (req:Request, res:Response) => {
    try {
        const tkn:string = await req.cookies['accessToken'];
        const payload:jwt.JwtPayload = await jwt.verify(tkn,process.env.ACCESS_TOKEN_SECRET as string) as jwt.JwtPayload;
        const {userName,userId} = await payload as UserNamespace.UserPayload;
        await res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path:"/",
        });
        await res.clearCookie("reftoken", {
            httpOnly: true,
            path: '/reftoken',
            secure: false,
         });
         const deleteref:QueryResult = await pool.query("UPDATE users SET reftoken='' WHERE iduser=$1 AND username=$2",[userId,userName]);
        return res.send({ message: "User loggen out" ,redirectPath:"/",success: true});
    } catch (error:unknown) {
        return res.send({ error: error });
    }
}