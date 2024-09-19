import { MongoClient } from 'mongodb';
import { env } from '../../schemas/env.schema';

const url = env.MONGODB_URL;

const client = new MongoClient(url);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function mongo(operation: (client: MongoClient) => Promise<any>) {
  let success = false;
  try {
    await client.connect();
    console.info(
      ' 🧊 Mongodb connected successfully and is ready to perform the operation',
    );

    const result = await operation(client);
    success = true;
    return result;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  } finally {
    await client.close();
    if (success) {
      console.info(' 🧊 The Mongodb operation was performed successfully');
    } else {
      console.error(' ❌ Mongodb disconnected with errors');
    }
  }
}

export default mongo;
