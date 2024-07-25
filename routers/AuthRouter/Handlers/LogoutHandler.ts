import { Request, Response } from 'express';

export default async function LogoutHandler(req: Request, res: Response){
  return res.status(200).clearCookie("token").json({message:"Logout Successful"});
}