// import express from "express";
import pool from "@models/db";
import jwt from "jsonwebtoken";
import type { Request,Response } from "express";
import type { QueryResult } from "pg";
import type { UserNamespace } from "~/src/types/userPayload";
export const sendTablerow = async (req:Request, res:Response):Promise<void|Response> => {
    try {
        const rowsData = req.body.rows;
        if (!Array.isArray(rowsData)) {
            return res.status(400).json({ "err": "Expected an array of rows" });
        };

        const insertedRoes = [];
        for (const row of rowsData) {
            const {
                userid: teckNum,
                ticketid: ticketnumbera,
                rowid: rowNum,
                rowdate: rowDate,
                rowdata: rowText,
                timeformession: rowTiming,
                isDone: rowDone,
            } = row;

            if ((rowText !== undefined && rowText !== null && rowText !== "")) { //&& (rowTiming !== "" && rowTiming !== null && rowTiming !== undefined)
                const sendData:QueryResult = await pool.query(
                    `INSERT INTO tacketdata( iduserfr, ticketnumber,rownum, rowdate, rowtexttacket, timefortecket, doneornot) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [teckNum, ticketnumbera, rowNum, rowDate, rowText, rowTiming, rowDone]);
                insertedRoes.push(sendData.rows[0]);
            }
        }
        if (insertedRoes.length === 0) return res.status(400).json({ "key": "array is null" });
        res.status(201).json({
            success:true,
            path:'/tickets',
            message: "Data inserted successfully",
            insertedRoes,
        });

    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateTablerow = async (req:Request, res:Response):Promise<void|Response> => {
    try {
        const rowsData = req.body.rows;
        if (!Array.isArray(rowsData)) {
            return res.status(400).json({ "err": "Expected an array of rows" });
        };

        const insertedRoes = [];
        for (const row of rowsData) {
            const {
                userid: teckNum,
                ticketid: ticketnumbera,
                rowid: rowNum,
                rowdate: rowDate,
                rowdata: rowText,
                timeformession: rowTiming,
                isDone: rowDone,
            } = row;

            if (rowText && rowText !== "") {
                const sendData:QueryResult = await pool.query(`UPDATE tacketdata SET  rowdate=$4, rowtexttacket=$5, timefortecket=$6, doneornot=$7 WHERE iduserfr=$1 AND ticketnumber=$2 AND rownum=$3 RETURNING *`, [teckNum, ticketnumbera, rowNum, rowDate, rowText, rowTiming, rowDone]);
                insertedRoes.push(sendData.rows[0]);
            }
        }
        res.status(201).json({
            success:true,
            path:'/tickets',
            message: "Data UPDATED successfully",
            insertedRoes
        });

    } catch (error) {
        console.error("Error UPDATED data:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}
export const deleteTablerow = async (req:Request, res:Response)=>{
    try {
        const {teckitnum} = req.body;
        const tkn:string = await req.cookies['accessToken'];
        const payload:UserNamespace.UserPayload = await jwt.verify(tkn,process.env.ACCESS_TOKEN_SECRET as string) as UserNamespace.UserPayload;
        const {userName,userId} = await payload;
        const deletedrow:QueryResult = await pool.query(`delete from tacketdata where iduserfr=$1 and ticketnumber=$2`,[userId,teckitnum]);
        const deletedrowdone:QueryResult = await pool.query(`delete from istikectdone where iduserfr=$1 and ticketnumber=$2`,[userId,teckitnum]);
        const deletedrowid:QueryResult = await pool.query(`delete from tacketid where iduserfr=$1 and ticketnumber=$2`,[userId,teckitnum]);
        res.status(200).json({
            success:true,
            path:'/tickets',
            message: "Data Delete successfully"
        })
        
    } catch (error) {
        console.error("Error Delete data:", error);
        res.status(500).json({ error: "Internal server error" });
    }

}