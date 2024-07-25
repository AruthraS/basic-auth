import { initModels } from "../orm-models/init-models";
import DB from "../connections/db";

export async function getUserByEmail(email:string){
    const db = new DB();
    const sequelize = await db.connectDb();
    const models = initModels(sequelize);
    const result = await models.users.findOne({
        where:{
            email:email
        }
    });
    return result;
}