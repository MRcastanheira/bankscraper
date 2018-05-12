var https = require("https");
var querystring = require('querystring');

var {
  initialPageOptions,
  formPageOptions,
  brancoPageOptions,
  getLoginPageOptions,
  postLoginPageOptions,
  getLoginSenhaPageOptions,
  postLoginSenhaPageOptions,
  getUsuarioLogadoPageOptions,
  getMenuPageOptions,
  getSaldoOptions
} = require('./headers.js')

var lastUsedCookies;

function login(branch, account, password) {
  return requestPromise = new Promise(async function(resolve, reject) {
    var data = {};

    var initialPage = await DoRequest(initialPageOptions);

    if(!lastUsedCookies) {
      lastUsedCookies = GetCookies(initialPage.res);
    }

    // options = [
    //   initialPageOptions,
    //   formPageOptions,
    //   brancoPageOptions,
    //   getLoginPgeOptions,
    //   postLoginPageOptions,
    //   getLoginSenhaPageOptions,
    //   postLoginSenhaPageOptions,
    //   getUsuarioLogadoPageOptions,
    //   getMenuPageOptions,
    //   getSaldoOptions
    // ];

    formPageOptions.handleCookies(lastUsedCookies, GetCookies(initialPage.res));

    var formPage = await DoRequest(formPageOptions);

    brancoPageOptions.handleCookies(lastUsedCookies, GetCookies(formPage.res));

    var brancoPage = await DoRequest(brancoPageOptions);

    getLoginPageOptions.handleCookies(lastUsedCookies, GetCookies(brancoPage.res));

    var getLoginPage = await DoRequest(getLoginPageOptions);

    postLoginPageOptions.handleCookies(lastUsedCookies, GetCookies(getLoginPage.res));
    postLoginPageOptions.setDataField("agencia", branch);
    postLoginPageOptions.setDataField("conta", account);

    var postLoginPage = await DoRequest(postLoginPageOptions);

    //console.log(postLoginPage.res);

    getLoginSenhaPageOptions.handleCookies(lastUsedCookies, GetCookies(postLoginPage.res));

    var getLoginSenhaPage = await DoRequest(getLoginSenhaPageOptions);

    postLoginSenhaPageOptions.handleCookies(lastUsedCookies, GetCookies(getLoginSenhaPage.res));
    postLoginSenhaPageOptions.setDataField("Senha", password);

    var postLoginSenhaPage = await DoRequest(postLoginSenhaPageOptions);

    resolve();
  })
}

function getBalance() {
  return requestPromise = new Promise(async function(resolve, reject) {
    var data = {};

    if(!lastUsedCookies) {
      reject();
    }

    getSaldoOptions.appendCookies(lastUsedCookies);

    var getSaldo = await DoRequest(getSaldoOptions);

    var saldoLivre = getSaldo.body.match(/contaCorrente_campo1&quot;&gt;&amp;nbsp;R\$ ([\d|,|.]*?)&amp;nbsp;&lt;\/td&gt;&#xD;&#xA;&lt;\/tr&gt;&#xD;&#xA;&lt;tr class=/)[1]

    var resgateAutomatico = getSaldo.body.match(/contaCorrente_campo1&quot;&gt;&amp;nbsp;R\$ ([\d|,|.]*?)&amp;nbsp;&lt;\/td&gt;&#xD;&#xA;&lt;\/tr&gt;&#xD;&#xA;&lt;\//)[1]

    saldoLivre = ParsedNumberFormatToFloat(saldoLivre);
    resgateAutomatico = ParsedNumberFormatToFloat(resgateAutomatico);

    data.balance = (parseFloat(saldoLivre) + parseFloat(resgateAutomatico)).toFixed(2);

    resolve(data);
  })
}

function DoRequest(options, doResult) {
  return requestPromise = new Promise(function(resolve, reject) {

  const req = https.request(options, (res) => {
    var body;
    //console.log(`STATUS: ${res.statusCode}`);
    //console.log(`RESPONSE HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      //console.log(`BODY: ${chunk}`);
      body = chunk;
    });
    res.on('end', () => {
      console.log("Status code: " + res.statusCode);
      resolve({res: res, body: body});
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  if(options.method == "POST") {
    if(options.data) {
      const postData = querystring.stringify(options.data);
      req.write(postData);
    }
  }

  req.end();

  });
}

function GetCookies(srcOptions) {
  //console.log("GetCookies");
  var strCookies = srcOptions.headers["set-cookie"].toString();
  var cookies = strCookies
    .replace(/path=\/; HttpOnly,/g,'')
    .replace(/path=\/,/g,'')
    .replace(/path=\//g,'');

  return cookies;
}

function ParsedNumberFormatToFloat(parsedNumber) {
  return parsedNumber.replace('.', '').replace(',', '.');
}

module.exports = { login, getBalance }
