import { initModels } from "../orm-models/init-models";
import DB from "../connections/db";

export async function addUser(email:string,password:string){
    const db = new DB();
    const sequelize = await db.connectDb();
    const models = initModels(sequelize);
    const result = await models.users.create({
        email:email,
        password:password,
        id: ''
    });
    await db.disconnectDb();
    return result;
}