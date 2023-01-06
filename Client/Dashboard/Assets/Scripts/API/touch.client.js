let origin = "https://heady-fir-plum.glitch.me/" //window.location.origin

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

class Authentication {
  static async login(id, password) {
    let res = await fetch(origin+"rest/auth/login", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        password: password
      })
    })
    res = await res.json()
    if (res.status == "success") {
      let at = btoa(res.ACCESS_TOKEN)
      let rt = btoa(res.REFRESH_TOKEN)
      setCookie("at", at)
      setCookie("rt", rt)
      return res.account
    } else {
      throw res.message
    }
  }
  static async token() {
    let res = await fetch(origin+"rest/auth/token", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        REFRESH_TOKEN: atob(getCookie("rt") || btoa("undefined"))
      })
    })
    res = await res.json()
    if (res.status == "success") {

      let at = btoa(res.ACCESS_TOKEN)
      let rt = btoa(res.REFRESH_TOKEN)
      setCookie("at", at)
      setCookie("rt", rt)
      return res.account
    } else {
      throw res.message
    }
  }
  static async info() {
    let res = await fetch(origin+"rest/auth/info", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({})
    })
    res = await res.json()
    if (res.status == "success") {


      return res.info
    } else {
      throw res.message
    }
  }
  static async logout() {
    let res = await fetch(origin + "rest/auth/logout", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({})
    })
    res = await res.json()
    if (res.status == "success") {
  
  
      return res.info
    } else {
      throw res.message
    }
  }
}
class Record {

  static async all() {

    let res = await fetch(origin+"rest/record/all", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({

      })
    })
    res = await res.json()
    if (res.status == "success") {
      return res
    }
    throw res.message
  }
  static async create(name) {
    let res = await fetch(origin+"rest/record/create", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({
        name: name
      })
    })
    res = await res.json()
    if (res.status == "success") {
      return res
    }
    throw res.message
  }
  static async setField(name, field, value) {
    let res = await fetch(origin+"rest/record/setField", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({
        name: name,
        field: field,
        value: value
      })
    })
    res = await res.json()
    if (res.status == "success") {
      return res
    }
    throw res.message
  }
  static async getAllField(name) {
    let res = await fetch(origin+"rest/record/getAllField", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({
        name: name,

      })
    })
    res = await res.json()
    if (res.status == "success") {
      return res
    }
    throw res.message
  }
  static async getAllField(name) {
    let res = await fetch(origin+"rest/record/getAllField", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({
        name: name,

      })
    })
    res = await res.json()
    if (res.status == "success") {
      return res
    }
    throw res.message
  }
}
class UI {

  static async all() {

    let res = await fetch(origin+"rest/ui/all", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({

      })
    })
    res = await res.json()
    if (res.status == "success") {
      return res
    }
    throw res.message
  }
  static async create(name) {
    let res = await fetch(origin+"rest/ui/create", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({
        name: name
      })
    })
    res = await res.json()
    if (res.status == "success") {
      return res
    }
    throw res.message
  }

  static async layout(name) {
    let res = await fetch(origin+"rest/ui/getLayout", {
      method: "post",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "authorization": `Bear ${atob(getCookie("at"))}`
      },
      body: JSON.stringify({
        name: name,

      })
    })
    res = await res.json()
    if (res.status == "success") {
      return res
    }
    throw res.message
  }

}
//Authentication.login(1234,1234)
//Record.getAllField("sang1")
//Record.create("gg2")
//Record.all()

//Authentication.logout()
//Authentication.token()
//Authentication.info()
//UI.create("r")
//UI.layout("r")
//UI.all()
let sv = null
function initSocket(){
 sv = io(origin)
}
function connectSocketSv() {
  return new Promise((resolve, reject) => {
    sv.on("require_auth", function() {
      sv.emit("auth", {
        ACCESS_TOKEN: atob(getCookie("at"))
      })
      sv.on("auth_success", function(r) {
        console.log(r);
        resolve(r)
      })
      sv.on("auth_err", function(e) {
        reject(e)
      })
    })
  })
}

function addRecordListener(name) {
  return new Promise((resolve, reject) => {
    sv.emit("listener", {
      name: name
    })
    sv.on("listening", function(r) {
      console.log(r);
      resolve(r)
    })
    sv.on("auth_err", function(e) {
      reject(e)
    })
  })
}

function onNewVal(callback) {
  sv.on("new_val", function(r) {
    console.log(r);
    callback(r)
  })
}
/*
connectSocketSv().then(() => {
  return addRecordListener("gg2")
}).then(() => {
  onNewVal(function(d) {})
})

*/