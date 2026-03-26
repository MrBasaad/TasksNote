import pool from "@models/db";
import bcrypt from "bcrypt";
import type { Request,Response } from "express";
import type { QueryResult } from "pg";
// create user and password (Sing up)
export const creatUser = async (req:Request, res:Response) => {
    try {
        const { user, passwd, email } = req.body;
        const hashPassword:string = await bcrypt.hash(passwd, 10);
        const checkvalidUser:QueryResult = await pool.query(`SELECT EXISTS(SELECT 1 FROM  users WHERE username=$1)`, [user]);
        if (user !== "" && passwd !== "" && email !== "") {
            if (checkvalidUser.rows[0].exists !== true) {
                const newUser:QueryResult = await pool.query(`INSERT INTO users(username , passworduser,emailuser)VALUES($1,$2,$3)RETURNING *`, [user, hashPassword, email]);
                res.status(201).json(newUser.rows[0]);
                return;
            } else {
                const err = new Error("This user is exists");
                res.status(406).json({ "err": err.message });
                return;
            }
        } else {
            const err = new Error("some data are not valid empty or start with space");
            res.status(406).json({ "err": err.message });
            return;
        }
    } catch (error) {
        return console.error(error);
    }
    // check if user exiest and if not create new user and password
}
// get all users
export const getAllUsers = async (req:Request, res:Response) => {
    try {
        const allUsers:QueryResult = await pool.query(`SELECT * FROM users`);
        if (allUsers.rows[0] === undefined) {
            res.json({ "key": "no data" });
        } else {
            res.json(allUsers.rows);
        }
    } catch (error) {
        return console.error(error);
    }
}

export const getUser = async (req:Request, res:Response) => {
    try {
        const { idUser } = req.params;
        const user:QueryResult = await pool.query(`SELECT * FROM users WHERE iduser=$1`, [idUser]);
        if (user.rowCount === 0) {
            const err = new Error(`not data macth your id ${idUser}`);
            res.json({ "err": err.message });
        } else {
            res.json(user.rows[0]);
        }
    } catch (error) {
        return console.error(error);
    }
}
// login by user and password (Sing in)

export const updateUserName = async (req:Request, res:Response) => {
    try {
        const { username, iduser } = req.body;
        const checkvalidUser:QueryResult = await pool.query(`SELECT EXISTS(SELECT 1 FROM  users WHERE username=$1)`, [username]);
        if (checkvalidUser.rows[0].exists !== true) {
            if (username !== "" && iduser !== "") {
                const dataUpdated:QueryResult = await pool.query(`UPDATE users SET username=$1 WHERE iduser=$2`, [username, iduser]);
                if (dataUpdated.rowCount === 0) {
                    return console.error("No rows updated");
                } else {
                    return res.status(200).json({ "data": "User Name updated successfully" });
                }
            } else {
                return res.status(400).json({ "err": "Data Null" });
            }
        } else {
            return res.status(400).json({ "err": "This user not valid" });
        }
    } catch (error) {
        return console.error(error);
    }
}
export const updateUserPasswd = async (req:Request, res:Response) => {
    try {
        const { passworduser, iduser } = req.body;
        if (passworduser !== "" && iduser !== "") {
            const userpasswdhased:string = await bcrypt.hash(passworduser, 10);
            const dataUpdated:QueryResult = await pool.query(`UPDATE users SET passworduser=$1 WHERE iduser=$2`, [userpasswdhased, iduser]);
            return res.status(200).json({ "data": "User Password updated successfully" });
        } else {
            return res.status(400).json({ "err": "Data Null" });
        }
    } catch (error) {
        return console.error(error);
    }
}
export const updateUserEmail = async (req:Request, res:Response) => {
    try {
        const { emailuser, iduser } = req.body;
        if (emailuser !== "" && iduser !== "") {
            const dataUpdated:QueryResult = await pool.query(`UPDATE users SET emailuser=$1 WHERE iduser=$2`, [emailuser, iduser]);
            return res.status(200).json({ "data": "User Email updated successfully" });
        } else {
            return res.status(400).json({ "err": "Data Null" });
        }
    } catch (error) {
        return console.error(error);
    }
}