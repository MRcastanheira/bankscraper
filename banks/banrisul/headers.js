var BaseOptions = require('../../options.js');

class BanrisulOptions extends BaseOptions {
  constructor() {
    super('ww8.banrisul.com.br', 443);
    this.setCheckerMethod(checkerMethod_is200);
  }
}

class BanrisulOptionsGet extends BanrisulOptions {
  constructor() {
    super();
    this.setMethod('GET');
    this.setHeaders(GETOptions);
  }
}

class BanrisulOptionsPost extends BanrisulOptions {
  constructor() {
    super();
    this.setMethod('POST');
    this.setHeaders(POSTOptions);
  }
}

const GETOptions = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,de;q=0.8,pt;q=0.7',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
    'Cookie': 'CONFIG=INITEXT=N&CARTAO=N&LEITORA=&Usar_Leitora=N&Impressao_Automatica=N&Contraste=1&CaseTeclado=&TF=11',
    'Upgrade-Insecure-Requests': '1'
};

const POSTOptions = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,de;q=0.8,pt;q=0.7',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
  'Cookie': 'CONFIG=INITEXT=N&CARTAO=N&LEITORA=&Usar_Leitora=N&Impressao_Automatica=N&Contraste=1&CaseTeclado=&TF=11',
  'Upgrade-Insecure-Requests': '1',
  'Cache-Control': 'max-age=0',
  'Content-Type': 'application/x-www-form-urlencoded'
};

function checkerMethod_is200(res) {
  return res.statusCode == 200;
}

function checkerMethod_is302(res) {
  return res.statusCode == 302;
}

var initialPageOptions = new BanrisulOptionsGet();
initialPageOptions.setPath('/brb/link/brbwe4hw.aspx?Largura=1920&Altura=995&Sistema=Home');

var formPageOptions = new BanrisulOptionsPost();
formPageOptions.setPath('/brb/link/brbwe4hw.aspx?Largura=1920&Altura=995&Sistema=Home');
formPageOptions.setData({ Etapa: '2' });

var brancoPageOptions = new BanrisulOptionsPost();
brancoPageOptions.setPath('/brb/link/Brbwe4hw_branco.aspx');

var getLoginPageOptions = new BanrisulOptionsGet();
getLoginPageOptions.setPath('/brb/link/Brbw4Dhw_Login.aspx');

var postLoginPageOptions = new BanrisulOptionsPost();
postLoginPageOptions.setPath('/brb/link/Brbw4Dhw_Login.aspx');
postLoginPageOptions.setData({
  __VIEWSTATE: '/wEPDwUJNTIwMjMxOTIxD2QWAgICD2QWAgIBD2QWBAIDD2QWDAIBDxYCHglpbm5lcmh0bWwFL0lORk9STUUgU1VBIDxiPkFHJkVjaXJjO05DSUE8L2I+IEUgPGI+Q09OVEE8L2I+ZAIDDxYCHgdWaXNpYmxlaGQCBQ8WAh8BaGQCBw8WAh8BaGQCCQ8WAh8BaGQCCw9kFgQCAQ8WAh8BaGQCBw8WAh8ABR7CuyBBY2Vzc28gw6AgY29udGEgY29tIENhcnTDo29kAgUPFgIfAAWPAjwhRE9DVFlQRSBodG1sIFBVQkxJQyAiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFRyYW5zaXRpb25hbC8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS10cmFuc2l0aW9uYWwuZHRkIiA+PGh0bWwgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiPjxoZWFkPjxtZXRhIGh0dHAtZXF1aXY9IkNvbnRlbnQtdHlwZSIgY29udGVudD0idGV4dC9odG1sO2NoYXJzZXQ9SXNvLTg4NTktMSIgLz48L2hlYWQ+PGJvZHk+PC9ib2R5PjwvaHRtbD5kZDnVpeCDVWzbXIxdJffvheYn5Qdd',
  __VIEWSTATEGENERATOR: 'CDCE93F6',
  __EVENTVALIDATION: '/wEdAAa7DHzs3zKiHau+QtFl+kczoc9wmMgkKHwgKYzL+WWWTBFkTKdQUxmzPw7BzR28F9lR6vNKIq21G0uuFWSRHEFJf4tUTbG8CXOFFEQYAoyTU4+up91NJJGE4t1S8AKvWCPGsKuf8FZr4oHdv5fnhVE/9REOuw==',
  agenciaCV: '', contaCV: '', VeroPay: 'N', Sequencia: '', PAN: '', Info: '',
  JavaVersion: '?', Criptograma: '', Certificado: '', LoginCartao: 'N', LoginCartaoVirtual: 'N'
});
postLoginPageOptions.setCheckerMethod(checkerMethod_is302);

var getLoginSenhaPageOptions = new BanrisulOptionsGet();
getLoginSenhaPageOptions.setPath('/brb/link/Brbw4Dhw_Login_Senha.aspx');

var postLoginSenhaPageOptions = new BanrisulOptionsPost();
postLoginSenhaPageOptions.setPath('/brb/link/Brbw4Dhw_Login_Senha.aspx');
postLoginSenhaPageOptions.setData({
  __VIEWSTATE: '/wEPDwUKMTQ5MDIzODY2OA9kFgICAw9kFgICAQ9kFgICBQ8WAh4JaW5uZXJodG1sBR7CuyBBY2Vzc28gw6AgY29udGEgY29tIENhcnTDo29kZMGhIpzKHj8eWNbL1muON2VUAjcM',
  __VIEWSTATEGENERATOR: 'AEA9E94F',
  __EVENTVALIDATION: '/wEdAAIVK9fWcOCiH+WNRt+XRikkffys55W/gmrV2SyCTq7i980Zg83RwfPxXluYjYce0BCK7Znd',
  Sequencia: ''
});
postLoginSenhaPageOptions.setCheckerMethod(checkerMethod_is302);

var getUsuarioLogadoPageOptions = new BanrisulOptionsGet();
getUsuarioLogadoPageOptions.setPath('/brb/link/Brbw4Dhw_Usuario_Logado.aspx');

var getMenuPageOptions = new BanrisulOptionsGet();
getMenuPageOptions.setPath('/brb/link/BrbwE4hw_Menu.aspx');

var getSaldoOptions = new BanrisulOptionsPost();
getSaldoOptions.setPath('/brb/link/Brbw4dxn_Processamento.asmx/ObtemSaldoDoDia');

module.exports = {
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
}
