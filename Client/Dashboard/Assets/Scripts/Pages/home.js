let state_display = new snail.Element(document.querySelector("#state-display"))
state_display.text = "Requesting Token . . ."
Authentication.token()
  .then(() => {
    state_display.text = "Checking information . . ."
    return Authentication.info()
  })
  .then((r) => {
    if (r.role == "user") {
      state_display.text = "Redirect to dashboard. . ."
      setTimeout(() => { window.location = "./Pages/User/index.html" }, 1000)
    }
  })
  .catch(() => {
    state_display.text = "Redirect to login page. . ."
    setTimeout(() => { window.location = "./login.html" }, 1000)
  })