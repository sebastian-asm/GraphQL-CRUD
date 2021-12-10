import { MongoClient } from 'mongodb';

export default async function dbConnection() {
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    return client.db('graphql-test');
  } catch (error) {
    console.log('Error connection to MongoDB', error);
    process.exit(1);
  }
}
