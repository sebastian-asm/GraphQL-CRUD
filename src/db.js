import { MongoClient } from 'mongodb';

let db;

export default async function dbConnection() {
  // evitar multiples conexiones
  if (db) return db;

  const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db('graphql-crud');
    return db;
  } catch (error) {
    console.log('Error connection to MongoDB', error);
    process.exit(1);
  }
}
