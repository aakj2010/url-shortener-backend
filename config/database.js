const mongoose = require('mongoose');
const dotenv = require("dotenv").config()

const URL = process.env.DB;
const connectDB = async () => {
   
    try {
        const conn = await mongoose.connect(URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB