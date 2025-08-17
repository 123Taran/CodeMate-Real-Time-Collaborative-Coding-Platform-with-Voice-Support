const mongoose = require("mongoose");

require ("dotenv").config();

const connectionDb = async ()=>{
    try{
        await mongoose.connect(process.env.Database_Connection_URL);

        console.log("DB Connected");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectionDb;