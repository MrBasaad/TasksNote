// import express from "express";
import pool from "@models/db";
import jwt from "jsonwebtoken";
import { QueryResult } from "pg";
import type { UserNamespace } from "~/src/types/userPayload";
export const getTablerow = async (req:any, res:any) => {
    try {
        const tkn:string = await req.cookies['accessToken'];
        const payload:UserNamespace.UserPayload = await jwt.verify(tkn,process.env.ACCESS_TOKEN_SECRET as string) as UserNamespace.UserPayload;
        const {userName,userId} = await payload;
        const {idtecketrfr} = req.body;
        const data:QueryResult = await pool.query(`SELECT * FROM tacketdata WHERE ticketnumber=$1 AND iduserfr=$2`, [idtecketrfr, userId]);
        return res.status(200).json(data.rows);
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}