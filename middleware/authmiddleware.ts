import { Request,Response,NextFunction } from "express";
import jwt ,{JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

declare global{
    namespace Express{
        interface Request{
            session:{
                id:number,
                email:string
            }
        }
    }
}

export default function authMiddleware(req:Request,res:Response,next:NextFunction){
    const cookies = req.cookies;
    if(!cookies){
        res.status(403).clearCookie("token").json({messages:"Unauthorizedc"});
    }
    const token = cookies["token"];
    if(!token || token==""){
        res.status(403).clearCookie("token").json({messages:"Unauthorizedt"});
    }
    let decoded:JwtPayload;
    const jwt_secret = process.env.JWT_SECRET!;
    try{
        console.log(jwt_secret);
        decoded = jwt.verify(token,jwt_secret) as JwtPayload;
    }
    catch(err:any){
        res.status(403).clearCookie("token").json({messages:"Unauthorizedm"});
    }
    req.session={
        id:decoded!.id,
        email:decoded!.email
    }
    next();
}