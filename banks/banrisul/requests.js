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

    if(!initialPageOptions.isResultCorrect(initialPage.res)) {
      reject();
    }

    if(!lastUsedCookies) {
      lastUsedCookies = GetCookies(initialPage.res);
    }

    options = [
      formPageOptions,
      brancoPageOptions,
      getLoginPageOptions,
      postLoginPageOptions,
      getLoginSenhaPageOptions,
      postLoginSenhaPageOptions
    ];

    postLoginPageOptions.setDataField("agencia", branch);
    postLoginPageOptions.setDataField("conta", account);
    postLoginSenhaPageOptions.setDataField("Senha", password);

    options.reduce(async function(promise, currOptions, index) {
      return promise
      .then(async (prevOptionsResult) => {
        currOptions.handleCookies(lastUsedCookies, GetCookies(prevOptionsResult.res));
        try {
          var result = await DoRequest(currOptions);

          if(index >= options.length - 1) {
            resolve();
          }
          return result;

         } catch (err) {
           reject();
         }
      })
    }, Promise.resolve(initialPage));
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
      //console.log(options);
      if(options.isResultCorrect(res)) {
        resolve({res: res, body: body});
      } else {
        reject();
      }
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
