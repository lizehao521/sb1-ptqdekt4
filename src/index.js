import dotenv from 'dotenv';
import { BinanceService } from './services/binanceService.js';
import { ArbitrageStrategy } from './strategies/arbitrageStrategy.js';
import { config } from './config/config.js';
import { logger } from './utils/logger.js';

dotenv.config();

async function main() {
  const binanceService = new BinanceService();
  const strategy = new ArbitrageStrategy(binanceService);

  setInterval(async () => {
    try {
      const opportunities = await strategy.findArbitrageOpportunities();
      
      for (const opportunity of opportunities) {
        logger.info(`Found opportunity: ${opportunity.pair} with spread ${opportunity.spread}`);
        await strategy.executeArbitrage(opportunity);
      }
    } catch (error) {
      logger.error('Error in main loop:', error);
    }
  }, config.UPDATE_INTERVAL);
}

main().catch(error => {
  logger.error('Fatal error:', error);
  process.exit(1);
});