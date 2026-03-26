// import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import pool from "@models/db";
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from "./tokens";
import type { Request, Response } from "express";
import type { QueryResult } from "pg";
export const refreshToken = async (req:Request, res:Response):Promise<Response|void> => {
    try {
    const token:string = req.cookies['refToken'] || req.cookies['reftoken'];
    if (!token) return res.send({ accessToken: "" });
    let payload:jwt.JwtPayload|null = null;
    try {
        payload = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as jwt.JwtPayload;
    } catch (error) {
        return res.send({ accessToken: "" });
    }
    const username:string = payload['userName'];
    const userId:number|string = payload['userId'];
    const user:QueryResult = await pool.query(`SELECT EXISTS(SELECT 1 FROM  users WHERE username=$1)`, [username]);
    if (user.rows[0].exists !== true) return res.send({ accessToken: "" });
    if (user.rows[0].exists === true) {
        const dataUser:QueryResult = await pool.query(`select * from users where username=$1`, [username]);
        const passwd:string = await dataUser.rows[0].passworduser;
        if (dataUser.rows.length === 0) return res.send({ accessToken: "" });
        if (dataUser.rows[0].reftoken !== token) return res.json({ accessToken: "" });
        const accessToken:string = await createAccessToken(username, userId);
        const newrefreshToken:string = await createRefreshToken(username, userId);
        const tokenindb:QueryResult = await pool.query(`UPDATE users SET reftoken=$1 WHERE username=$2 AND passworduser=$3`, [newrefreshToken, username, passwd]);
        sendRefreshToken(req, res, newrefreshToken);
        return res.json({ accessToken });
    }
    } catch (error) {
        return res.status(500).send({ accessToken: "" });
    }
}
