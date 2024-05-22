import  mongoose  from "mongoose";
import { logger } from "../logger";


export const mongoDb = async() =>{
    try {

        mongoose.connect('mongodb://localhost:27017/ts-login').then(()=>{
            logger.info('connected...')
        // console.log('connected...')
        }).catch((err)=>{
            logger.info('mongo Db connection error',err)
        })

    } catch (error) {
        logger.info('Db connection Error:',error)
    }
}
