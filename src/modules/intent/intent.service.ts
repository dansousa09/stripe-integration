import redis from '../../infra/cache/redis';
import checkoutService from '../checkout/checkout.service';

class IntentService {
  private static instance: IntentService;

  private constructor() {}

  static getInstance(): IntentService {
    if (!IntentService.instance) {
      IntentService.instance = new IntentService();
    }
    return IntentService.instance;
  }

  async createIntent(name: string, text: string) {
    const prefix = 'intent:';
    const slug = String(name)
      .toLowerCase()
      .replace(/\s/g, '-')
      .concat('-')
      .concat(Math.random().toString(36).substring(7));

    await redis.set(prefix + slug, text, 'EX', 3600);

    const { url } = await checkoutService.createCheckout();

    return { slug, url };
  }
}

const intentService = IntentService.getInstance();

export default intentService;
