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
    const slug = await intentService.createIntent(req.body.name, req.body.text);

    return res.status(201).json({
      message: 'Intent created successfully',
      slug,
      expires_in: '3600s',
    });
  }
}

const intentController = IntentController.getInstance();

export default intentController;
