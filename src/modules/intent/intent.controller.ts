import type { Request, Response } from "express";
import redis from "../../infra/database/redis";

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
    const slug =
      "intent:" +
      String(req.body.name)
        .toLowerCase()
        .replace(/\s/g, "-")
        .concat("-")
        .concat(Math.random().toString(36).substring(7));

    await redis.set(slug, req.body.text, "EX", 3600);
    return res.status(201).json({
      message: "Intent created successfully",
      slug,
      expires_in: "3600s",
    });
  }
}

const intentController = IntentController.getInstance();

export default intentController;
