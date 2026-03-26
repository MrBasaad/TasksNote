import { type Request } from 'express';
import jwt from "jsonwebtoken";
import "dotenv/config";
export const isAuth = async (req: Request) => {
  try {
    const token:string = await req.cookies['accessToken'];
    if (!token){
        return "No token provided";   
    }
      const payload:jwt.JwtPayload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as jwt.JwtPayload;
      return payload ;
  } catch (error:unknown) {
        return error as string;
    
  }
}