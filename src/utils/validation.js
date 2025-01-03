export const validateTrade = (symbol, side, quantity) => {
  if (!symbol || typeof symbol !== 'string') {
    throw new Error('Invalid symbol');
  }
  
  if (!['BUY', 'SELL'].includes(side)) {
    throw new Error('Invalid trade side');
  }
  
  if (!quantity || quantity <= 0) {
    throw new Error('Invalid quantity');
  }
};