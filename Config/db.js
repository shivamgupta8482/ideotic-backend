const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
//require("dotenv").config();

// const connection = mongoose.connect(process.env.MONGO_URL);

const connection =mongoose.connect("mongodb+srv://shivamgupta8482:shivamgupta8482@cluster0.esstzzf.mongodb.net/?retryWrites=true&w=majority")


module.exports=connection;