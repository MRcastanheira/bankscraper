class BaseOptions {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  setMethod(method) {
    this.method = method;
  }

  setPath(path) {
    this.path = path;
  }

  setHeaders(headers) {
    this.headers = headers;
  }

  setData(data) {
    this.data = data;
  }

  setDataField(field, value) {
    this.data[field] = value;
  }

  setCookies(cookies) {
    this.headers["Cookie"] = cookies;
  }

  handleCookies(baseCookies, updatedCookies) {
    this.appendCookies(baseCookies);
    this.updateCookies(updatedCookies);
  }

  appendCookies(cookies) {
    this.headers["Cookie"] += '; ';
    this.headers["Cookie"] += cookies;
  }

  updateCookies(cookies) {
    var updatedCookies = this.headers["Cookie"];

    var separatedCookies = cookies.trim().split('; ');

    separatedCookies.forEach(cookie => {
      var nameAndValues = cookie.split('=');
      if(nameAndValues.length == 2) {
        var replace = nameAndValues[0] + '=\\w*;';
        var re = new RegExp(replace,"g");
        var newValue = nameAndValues[0] + "=" + nameAndValues[1] + ";";
        updatedCookies = updatedCookies.replace(re, newValue);
      }
    })

    this.headers["Cookie"] = updatedCookies;
  }

}

module.exports = BaseOptions;
