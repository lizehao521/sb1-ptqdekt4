import { config } from '../config/config.js';
import { logger } from '../utils/logger.js';
import { MarketDataService } from '../services/marketDataService.js';

export class ArbitrageStrategy {
  constructor(binanceService) {
    this.binanceService = binanceService;
    this.marketDataService = new MarketDataService(binanceService);
  }

  async findArbitrageOpportunities() {
    try {
      const opportunities = [];

      for (const pair of config.TRADING_PAIRS) {
        const symbol = pair.replace('/', '');
        const { spread, bestBid, bestAsk } = await this.marketDataService.getSpread(symbol);

        if (spread > config.PROFIT_THRESHOLD) {
          opportunities.push({ pair, spread, bestBid, bestAsk });
        }
      }

      return opportunities;
    } catch (error) {
      logger.error('Error finding arbitrage opportunities:', error);
      throw error;
    }
  }

  async executeArbitrage(opportunity) {
    try {
      const symbol = opportunity.pair.replace('/', '');
      const quantity = config.TRADE_AMOUNT / opportunity.bestAsk;

      // Buy at the lower price
      await this.binanceService.executeTrade(symbol, 'BUY', quantity);
      
      // Sell at the higher price
      await this.binanceService.executeTrade(symbol, 'SELL', quantity);

      logger.info(`Arbitrage executed for ${opportunity.pair} with spread ${opportunity.spread}`);
    } catch (error) {
      logger.error('Error executing arbitrage:', error);
      throw error;
    }
  }
}