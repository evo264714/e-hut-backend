const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('eHutDb');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connectToDB };
