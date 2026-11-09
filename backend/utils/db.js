
const mongoose = require('mongoose');

const connectDB = async () => {

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Database connected");
    
}

module.exports = connectDB;



// const {MongoClient} = require('mongodb');

// const connectDB = async()=>{

//     const client = new MongoClient(process.env.MONGODB_URL)

//    await client.connect();
// }
// module.exports = connectDB;