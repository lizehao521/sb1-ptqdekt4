import Binance from 'binance-api-node';
import { logger } from '../utils/logger.js';
import { validateTrade } from '../utils/validation.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

export class BinanceService {
  constructor() {
    // Fix: Use the correct way to initialize Binance client
    this.client = Binance({
      apiKey: process.env.BINANCE_API_KEY,
      apiSecret: process.env.BINANCE_API_SECRET
    });
  }

  async getPrices() {
    try {
      return await this.client.prices();
    } catch (error) {
      logger.error(ERROR_MESSAGES.PRICE_FETCH_ERROR, error);
      throw error;
    }
  }

  async getOrderBook(symbol) {
    try {
      return await this.client.book({ symbol });
    } catch (error) {
      logger.error(`${ERROR_MESSAGES.ORDER_BOOK_ERROR} for ${symbol}:`, error);
      throw error;
    }
  }

  async executeTrade(symbol, side, quantity) {
    try {
      validateTrade(symbol, side, quantity);
      const order = await this.client.order({
        symbol,
        side,
        quantity,
        type: 'MARKET'
      });
      logger.info(`Trade executed: ${side} ${quantity} ${symbol}`);
      return order;
    } catch (error) {
      logger.error(`${ERROR_MESSAGES.TRADE_EXECUTION_ERROR} for ${symbol}:`, error);
      throw error;
    }
  }
}