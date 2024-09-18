import type { Request, Response } from 'express';
import redis from '../../infra/cache/redis';
import mongo from '../../infra/database/mongodb';

class IntentController {
  private static instance: IntentController;

  private constructor() {}

  static getInstance(): IntentController {
    if (!IntentController.instance) {
      IntentController.instance = new IntentController();
    }
    return IntentController.instance;
  }

  async createIntent(req: Request, res: Response) {
    const prefix = 'intent:';
    const slug = String(req.body.name)
      .toLowerCase()
      .replace(/\s/g, '-')
      .concat('-')
      .concat(Math.random().toString(36).substring(7));

    await redis.set(prefix + slug, req.body.text, 'EX', 3600);

    await mongo(async (client) => {
      return await client.db('mydb').collection('intents').insertOne({ slug });
    });

    return res.status(201).json({
      message: 'Intent created successfully',
      slug,
      expires_in: '3600s',
    });
  }
}

const intentController = IntentController.getInstance();

export default intentController;
