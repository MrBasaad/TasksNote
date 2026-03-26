import { JwtPayload } from "jsonwebtoken";

export namespace UserNamespace {
export interface UserPayload {
    userId: number |string;
    userName: string;
}
export interface UserData {
    iduser?: number | string;
    username?: string;
    passworduser?: string;
    reftoken?: string;
}
export interface UserFromObjPayload extends JwtPayload  {
     user:UserNamespace.UserPayload;
}
}
