import { z } from 'zod';

export const createIntentSchema = z.object({
  body: z.object({
    text: z.string({
      required_error: 'text is required',
    }),
    name: z.string({
      required_error: 'name is required',
    }),
  }),
});
