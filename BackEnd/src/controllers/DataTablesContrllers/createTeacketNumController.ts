import type { UserNamespace } from "~/src/types/userPayload";
import pool from "@models/db";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import type { QueryResult } from "pg";
export const createTikectNum = async (req:Request, res:Response) => {
  try {
    const tkn:string = await req.cookies['accessToken'];
    const payload:UserNamespace.UserPayload = await jwt.verify(tkn, process.env.ACCESS_TOKEN_SECRET as string) as UserNamespace.UserPayload;
    const { userName, userId } = await payload ;
    const addIdToSQL:QueryResult = await pool.query(
      `INSERT INTO tacketid(iduserfr)VALUES($1)RETURNING *`,
      [userId],
    );
    if (addIdToSQL.rowCount === 0) {
      res.status(400).json({ msg: "err" });
    } else {
      res.status(200).json(addIdToSQL.rows);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
export const getteckts = async (req:Request, res:Response) => {
  try {
    const tkn:string = await req.cookies['accessToken'];
    const payload:UserNamespace.UserPayload = await jwt.verify(tkn, process.env.ACCESS_TOKEN_SECRET as string) as UserNamespace.UserPayload;
    const { userName, userId } = await payload ;
    const allteckts:QueryResult = await pool.query(`SELECT * FROM tacketid WHERE iduserfr =$1`,[userId]);
    if (allteckts.rowCount === 0) {
      res.status(400).json({ msg: "no data " });
    } else {
      res.status(200).json(allteckts.rows.reverse()[0]);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
