import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../../../models/getUser';
import { addUser } from '../../../models/addUser';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../../../.env')
});

const salt = parseInt(process.env.SALT!);

export default async function SignUpHandler(req: Request, res: Response) {
    const { email, password } = req.body;
    try{
        const result = await getUserByEmail(email);
        if(result){
            res.status(409).json({message:'User Already Exists'});
        }
        await bcrypt.hash(password, salt, (err, hash) => {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            else{
                addUser(email, hash);
                res.status(201).send({message:'User Created'});
            }
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:'Internal Server Error'});
    }
}