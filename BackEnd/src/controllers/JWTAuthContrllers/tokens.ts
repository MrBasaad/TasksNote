import jwt from "jsonwebtoken";
import "dotenv/config";
import type { Request,Response } from "express";
// import cookieParser from "cookie-parser";
// import express from "express";
export const createAccessToken = async (userName:string, userId:number|string) => {
    return await jwt.sign({ userName, userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m", })//process.env.ACCESS_TOKEN_SECRET!
}
export const createRefreshToken = async (userName:string, userId:number|string) => {
    return await jwt.sign({ userName, userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d", })//process.env.REFRESH_TOKEN_SECRET!
}

export const sendAccessToken = async (req:Request, res:Response, accessToken:string, userId:number|string) => {
    res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path:"/",
  });
    res.json({ accessToken: accessToken, userName: req.body.user, userId: userId ,success:true,redirectPath: '/tickets'})
}
export const sendRefreshToken = async (req:Request, res:Response, refreshToken:string) => {
    await res.cookie("reftoken", refreshToken, {
        httpOnly: true,
        path: "/reftoken",
        secure: false,
    })
}