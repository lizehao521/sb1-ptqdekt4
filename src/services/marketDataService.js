import { logger } from '../utils/logger.js';

export class MarketDataService {
  constructor(binanceService) {
    this.binanceService = binanceService;
  }

  async getSpread(symbol) {
    const orderBook = await this.binanceService.getOrderBook(symbol);
    const bestBid = parseFloat(orderBook.bids[0].price);
    const bestAsk = parseFloat(orderBook.asks[0].price);
    return {
      spread: (bestBid - bestAsk) / bestAsk,
      bestBid,
      bestAsk
    };
  }
}