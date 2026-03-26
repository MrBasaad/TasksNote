// import express from "express";
import pool from "@models/db";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { UserNamespace } from "~/src/types/userPayload";
import type { QueryResult } from "pg";
export const getCountDataFalse = async (req:Request, res:Response) => {
    try {
        const tkn:string = await req.cookies['accessToken'];
        const payload:UserNamespace.UserPayload = await jwt.verify(tkn,process.env.ACCESS_TOKEN_SECRET as string) as UserNamespace.UserPayload;
        const {userName,userId} = await payload;
        const falseDataCount:QueryResult = await pool.query("SELECT COUNT(isdone) FROM istikectdone WHERE iduserfr=$1 AND isdone=false", [userId]);
        const trueDataCount:QueryResult = await pool.query("SELECT COUNT(isdone) FROM istikectdone WHERE iduserfr=$1 AND isdone=true", [userId]);
        return await res.status(200).json({'donedata':falseDataCount.rows,'notdonedata':trueDataCount.rows});
    } catch (error) {
        return res.status(400).json({ "err": "err this's null " });
    }
}