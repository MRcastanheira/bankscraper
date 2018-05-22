var requests = require('./requests.js')

var bankName = 'Banrisul';

var banrisul = {
    data: {},
    login: _login,
    getBalance: _getBalance
};

async function _login(branch, account, password, doResult) {
  console.log('Logging to', bankName);

  try {
    await requests.login(branch, account, password);
    doResult(true);
  } catch (err) {
    doResult(false);
  }
}

async function _getBalance(doResult) {
  console.log('getBalance from', bankName);

  if(this.data && this.data.hasOwnProperty('balance')) {
    return doResult(this.data.balance);
  }

  var data = await requests.getBalance();
  this.data.balance = data.balance;
  doResult(data.balance);
}

module.exports = banrisul;
