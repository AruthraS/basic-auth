import { Sequelize } from "sequelize";
import dbConfig from "../config/db_config";

class DB{
    sequelize: any;
    constructor(){
        this.sequelize = new Sequelize(dbConfig.dbName!, dbConfig.user!, dbConfig.password, {
        host: dbConfig.hostName,
        dialect: 'mysql'
        });
    }
    async connectDb(){
        try{
            await this.sequelize.authenticate();
            console.log("DB connected");
        }
        catch(err){
            console.log(err);
        }
        return this.sequelize;
    }
    async disconnectDb(){
        try{
            await this.sequelize.close();
            console.log("DB disconnected");
        }
        catch(err){
            console.log(err);
        }
    }
}

export default DB;