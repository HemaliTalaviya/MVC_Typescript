import  mongoose  from "mongoose";

export const mongoDb = async() =>{
    try {

        mongoose.connect('mongodb://localhost:27017/ts-login').then(()=>{
        console.log('connected...')
        }).catch((err)=>{
            console.log('mongo Db connection error',err)
        })

    } catch (error) {
        console.log('Db connection Error:',error)
    }
}
