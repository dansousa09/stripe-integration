import type { Request, Response } from 'express';
import intentService from './intent.service';

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
    try {
      const { slug, url } = await intentService.createIntent(
        req.body.name,
        req.body.text,
      );

      return res.status(201).json({
        message: 'Intent created successfully',
        slug,
        checkout_url: url,
        expires_in: '3600s',
      });
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
  }
}

const intentController = IntentController.getInstance();

export default intentController;
