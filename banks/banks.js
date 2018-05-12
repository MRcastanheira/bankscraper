var banrisul = require('./banrisul/banrisul.js');

var banks = function () {

  return {
    getBank: function(bankType) {
      if(bankType == 'banrisul') {
        return banrisul;
      }
    }
  }

}();

module.exports = banks;
