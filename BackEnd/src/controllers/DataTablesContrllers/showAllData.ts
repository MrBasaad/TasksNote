// import express from "express";
import type { UserNamespace } from "~/src/types/userPayload";
import pool from "@models/db";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { QueryResult } from "pg";
export const allData = async (req:Request, res:Response) => {
    try {
        const tkn:string = await req.cookies['accessToken'];
        const payload:UserNamespace.UserPayload = await jwt.verify(tkn,process.env.ACCESS_TOKEN_SECRET as string) as UserNamespace.UserPayload;
        const {userName,userId} = await payload;
        const dataForUser:QueryResult = await pool.query(`SELECT DISTINCT ON (td.ticketnumber) u.iduser, u.username, td.ticketnumber, td.rowdate, td.doneornot, td.timefortecket, itd.isdone AS is_ticket_done FROM tacketdata td JOIN users u ON u.iduser = td.iduserfr LEFT JOIN istikectdone itd ON td.iduserfr = itd.iduserfr AND td.ticketnumber = itd.ticketnumber WHERE u.username =$1;`, [userName]);
        const data = await dataForUser.rows;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ "msg": "err" });

    }
}
