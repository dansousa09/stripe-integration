import type { NextFunction, Request, Response } from 'express';
import { type AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: error.issues.map((e) => e.message).join(', '),
        });
      }
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  };
