import type { QueryResult } from "pg";
import pool from "@models/db";
import { type Request,type Response }from "express";
import { error } from "console";
export const getUserId = async (req:Request, res:Response) => {
    try {
        const { username } = await req.body;
        const iduser:QueryResult = await pool.query(`SELECT * FROM users WHERE username=$1`, [username]);
        if (iduser.rowCount === 0) {
            res.json({ "err": error("this user not exist") });
        } else {
            if (!isNaN(Number(iduser.rows[0]["iduser"]))) {
                res.status(200).json(Number(iduser.rows[0]["iduser"]));
            } else {
                console.log("this id not a number");
                res.status(400).json({ err: "not author" });
                return;
            }
        }
    } catch (error:unknown) {
        console.error(error);
        res.json({ "err": (error as Error).message });

    }
}