const express = require('express');
const bodyParser = require('body-parser');
const bankingRoutes = require('./api/bankingRoutes');
const bankingService = require('./services/bankingService');

const app = express();
const port = 8100;

app.use(bodyParser.json());

bankingRoutes(app);


app.post('/reset', (req, res) => {
    bankingService.resetAccounts()
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Banking API listening at http://localhost:${port}`);
});
