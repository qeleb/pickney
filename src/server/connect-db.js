import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/pickney`;
let db = null;

export async function connectDB() {
    if (db) return db;
    db = (await MongoClient.connect(url, { useNewUrlParser: true })).db();
    return db;
}