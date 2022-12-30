const mongoose = require('mongoose');
const dotenv = require("dotenv").config()
mongoose.set("strictQuery", true)

const Database = process.env.DB;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(Database)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB