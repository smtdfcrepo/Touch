Authentication.logout()
  .then(()=>{
    eraseCookie("rt")
    eraseCookie("at")
    setTimeout(() => { window.location = "./login.html" }, 1000)

  })
  .catch (()=>{
    eraseCookie("rt")
    eraseCookie("at")
    setTimeout(() => { window.location = "./login.html" }, 1000)

  })