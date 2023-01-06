let used_id_display = new snail.Element(document.querySelector("#user-id-display"))
function checkInfo(){
  Authentication.info()
    .then((info)=>{
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