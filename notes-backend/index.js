import mongoose from "mongoose";
import app from "./src/app";
import config from "./src/config/index.config";

( async ()=>{
    try{
        await mongoose.connect(config.MONGODB_URL);
        console.log("DB Connected");

        app.on('error', (err)=>{
            console.error("ERROR: ", err);
            throw err;
        })

        app.listen(config.PORT, ()=>{
            console.log(`Listening to the port ${config.PORT}`);
        })

    }
    catch (err){
        console.log("Error: ", err);
        throw err;
    }
})()