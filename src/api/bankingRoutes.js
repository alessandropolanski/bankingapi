const bankingService = require('../services/bankingService');

module.exports = (app) => {
  app.get('/balance', (req, res) => {
    const { account_id } = req.query;
    const balance = bankingService.getBalance(account_id);
    if (balance !== null) {
      res.status(200).send(balance.toString());
    } else {
      res.status(404).send('0');
    }
  });

  app.post('/event', (req, res) => {
    const { type, destination, origin, amount } = req.body;
    try {
      const result = bankingService.handleEvent(type, destination, origin, amount);
      res.status(201).json(result);
    } catch (error) {
      res.status(404).send('0');
    }
  });
};
