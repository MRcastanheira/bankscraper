const routes = require('express').Router();

var banks = require('../banks/banks.js');

routes.post('/login', function (req, res) {
  console.log("Attemping to login to " + req.bank.name);
  var branch = req.body.branch_number;
  var account = req.body.account_number;
  var password = req.body.password_number;
  login(req, res, branch, account, password, req.bank.bankType);
});

function login(req, res, branch, account, password, bankType) {
  var bank = banks.getBank(bankType);
  bank.login(branch, account, password, hasSucceeded => {
    if(hasSucceeded) {
      res.render('bank');
    } else {
      res.render('index', { infoMessage: "Conta ou senha incorretos"});
    }
  })
}

module.exports = routes;

// bank.getBalance(balance => {
//   res.send("Balance: " + balance);
// })
