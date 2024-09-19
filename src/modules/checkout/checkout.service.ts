import { Stripe } from 'stripe';
import { env } from '../../schemas/env.schema';

class CheckoutService {
  private static instance: CheckoutService;
  private stripe = new Stripe(env.STRIPE_SECRET_KEY);

  private constructor() {}

  static getInstance(): CheckoutService {
    if (!CheckoutService.instance) {
      CheckoutService.instance = new CheckoutService();
    }
    return CheckoutService.instance;
  }

  async createCheckout() {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Happy Message',
              description:
                'A message to make you happy using AI to generate it',
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return session;
  }
}

const checkoutService = CheckoutService.getInstance();

export default checkoutService;
