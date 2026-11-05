const {MongoClient} = require('mongodb');

const connectDB = async()=>{

    const client = new MongoClient(process.env.MONGODB_URL)

   await client.connect();
}
module.exports = connectDB;