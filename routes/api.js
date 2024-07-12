'use strict';
const fetch = require('node-fetch');
const crypto = require('crypto');

function anonymizeIP(ip) {
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 10);
}

let likes = {};

module.exports = function (app) {
  app.route('/api/stock-prices')
    .get(async function (req, res){
      const { stock, like } = req.query;
      const clientIP = anonymizeIP(req.ip);

      try {
        if (Array.isArray(stock)) {
          // Handle multiple stocks
          const results = await Promise.all(stock.map(async (symbol) => {
            const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`);
            const data = await response.json();
            const { symbol: stockSymbol, latestPrice: price } = data;
            
            if (like === 'true' && (!likes[stockSymbol] || !likes[stockSymbol].includes(clientIP))) {
              likes[stockSymbol] = likes[stockSymbol] || [];
              likes[stockSymbol].push(clientIP);
            }
            
            return { 
              stock: stockSymbol, 
              price, 
              likes: likes[stockSymbol] ? likes[stockSymbol].length : 0 
            };
          }));

          const [stock1, stock2] = results;
          const relLikes1 = stock1.likes - stock2.likes;
          const relLikes2 = stock2.likes - stock1.likes;

          res.json({
            stockData: [
              { stock: stock1.stock, price: stock1.price, rel_likes: relLikes1 },
              { stock: stock2.stock, price: stock2.price, rel_likes: relLikes2 }
            ]
          });
        } else {
          // Handle single stock
          const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
          const data = await response.json();
          const { symbol, latestPrice: price } = data;
          
          if (like === 'true' && (!likes[symbol] || !likes[symbol].includes(clientIP))) {
            likes[symbol] = likes[symbol] || [];
            likes[symbol].push(clientIP);
          }
          
          res.json({
            stockData: {
              stock: symbol,
              price,
              likes: likes[symbol] ? likes[symbol].length : 0
            }
          });
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Error fetching stock data' });
      }
    });
};