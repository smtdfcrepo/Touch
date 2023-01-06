let used_id_display = new snail.Element(document.querySelector("#user-id-display"))
let navbar_loader = new snail.Element(document.querySelector("#navbar-loader"))

function checkInfo(){
  Authentication.info()
    .then((info)=>{
      navbar_loader.style.display = "none"
      used_id_display.text = info.id
    })
}

Authentication.token()
  .then(() => {
    checkInfo()
  })
    .catch(() => {
    setTimeout(() => { window.location = "../../login.html" }, 1000)
  })