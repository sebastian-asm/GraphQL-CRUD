import { MongoClient } from 'mongodb';

let db;

export default async function dbConnection() {
  // evitar multiples conexiones
  if (db) return db;

  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db('graphql-test');
    return db;
  } catch (error) {
    console.log('Error connection to MongoDB', error);
    process.exit(1);
  }
}
