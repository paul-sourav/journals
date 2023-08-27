const mongoose = require("mongoose");

const connectDb = async()=>{
    const connect = await mongoose.connect(process.env.config);
    if(connect){
        console.log('conected with mongodb-'+connect.connection.port)
    }else{
        console.log("connection failed with mongodb")
    }
}
module.exports = connectDb