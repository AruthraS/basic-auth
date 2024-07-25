import { Request, Response } from 'express';
import { getUserByEmail } from '../../../models/getUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
import path from 'path';

config({
    path: path.resolve(__dirname, '../../../.env')
})

const jwt_secret = process.env.JWT_SECRET!;

export default async function LoginHandler(req: Request, res: Response){
  try{
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if(!user){
      res.status(404).json({message:'User Not Found'});
    }
    const isPass = await bcrypt.compare(password, user!.dataValues.password);
    if (!isPass) {
        res.status(502).json({messages: "Invalid Credentials"});
    }
    const token = jwt.sign(
        {
            email: user!.dataValues.email,
            id: user!.dataValues.id
        },
        jwt_secret,
        {
            expiresIn:"1d"
        }
    );
    res.status(200).cookie('token', token, {maxAge: 24 * 60 * 60 * 1000,httpOnly:true,secure:true,sameSite:'none'}).json({message:'Login Successful'});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message:'Internal Server Error'});
  }
}