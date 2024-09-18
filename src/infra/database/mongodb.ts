import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function mongo(operation: (client: MongoClient) => Promise<any>) {
  try {
    await client.connect();
    console.log('🚀 Mongodb connected successfully on port 27017');

    const result = await operation(client);
    return result;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  } finally {
    await client.close();
    console.log('🚀 Mongodb connection closed');
  }
}

export default mongo;
