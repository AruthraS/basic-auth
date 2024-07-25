import express from 'express';
import dotenv from 'dotenv';
import DB from './connections/db';
import {initModels} from './orm-models/init-models';
import morgan from 'morgan';
import AuthRouter from './routers/AuthRouter/router';
import authMiddleware from './middleware/authmiddleware';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors({
    origin:"*",
    credentials:true
}));

app.use('/auth',AuthRouter);

async function func(){
        const db = new DB();
        const sequelize = await db.connectDb();
        const models = initModels(sequelize);
        const result = await models.users.findAll();
        console.log((result[0].dataValues.password));
        await db.disconnectDb();
}

async function func2(){
    try{
        await func();
    }
    catch(err){
        console.log(err);
    }
}

// func2();

app.get('/test',authMiddleware,(req,res)=>{
    res.send('Hello World');
})

const server = app.listen(port,()=>{
    console.log(`listening at ${port}`)
})
