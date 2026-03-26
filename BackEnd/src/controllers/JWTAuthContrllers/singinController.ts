import pool from "@models/db";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from "./tokens";
import type { Request, Response } from "express";
import type { QueryResult } from "pg";

export const singin = async (req:Request, res:Response) => {
    try {
        const { user, passwd } = req.body;
        const checkvalidUser:QueryResult = await pool.query(`SELECT EXISTS(SELECT 1 FROM  users WHERE username=$1)`, [user]);
        if (checkvalidUser.rows[0].exists === true) {
            const passwordInDB:QueryResult = await pool.query(`SELECT passworduser,iduser FROM users WHERE username=$1`, [user]);
            const hashedPasswd:string = await passwordInDB.rows[0].passworduser;
            const userId:number|string = await passwordInDB.rows[0].iduser;
            const checkPassword:boolean = await bcrypt.compare(passwd, hashedPasswd);
            const checkvalidUserAndPasswd:QueryResult = await pool.query(`SELECT EXISTS(SELECT 1 FROM  users WHERE username=$1 AND passworduser=$2)`, [user, hashedPasswd]);
            if (checkvalidUserAndPasswd.rows[0].exists === true && checkPassword === true) {
            // return res.status(200).json({message:"تم تسجيل الدخول",success:true,redirectPath: '/tickets',userId,user});
                // const jwtUser = await { name: user };
                const accessToken:string = await createAccessToken(user, userId);
                const refreshToken:string = await createRefreshToken(user, userId);
                const tokenindb:QueryResult = await pool.query(`UPDATE users SET reftoken=$1 WHERE iduser=$2 AND username=$3`, [refreshToken, userId, user]); //AND passworduser=$3  INSERT INTO users WHERE UPDATE users SET reftoken=$1 WHERE 
                sendRefreshToken(req, res, refreshToken);
                sendAccessToken(req, res, accessToken, userId);
            } else {
                const err = new Error("User name or password not valid ");
                res.status(406).json({ "err": err.message });
                return;
            }
        } else {
            const err = new Error("User name or password not valid ");
            res.status(406).json({ "err": err.message,success:false,redirectPath: '/' });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error,success:false,redirectPath: '/' })
    }
}