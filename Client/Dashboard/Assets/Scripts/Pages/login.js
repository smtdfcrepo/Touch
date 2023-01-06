let form = new snail.Element(document.querySelector("form"))
let overlay = new snail.Element(document.querySelector("#overlay1"))
let message_display = new snail.Element(document.querySelector("#message-display"))
let user_id_field = form.select("[name=user-id]")
let password_field = form.select("[name=password]")
form.on("submit", function(e) {
  e.preventDefault()
 user_id_field.classList.remove("input-field-invalid")
 password_field.classList.remove("input-field-invalid")
 message_display.text = ''
  overlay.style.display = "block"
  Authentication.login(user_id_field.val, password_field.val)
    .then(() => {
      window.location = "./index.html"
    })
    .catch((e) => {
      overlay.style.display = "none"
      user_id_field.classList.add("input-field-invalid")
      password_field.classList.add("input-field-invalid")
      message_display.text = e
    })
})

form.on("input", function() {
  overlay.style.display = "none"
  user_id_field.classList.remove("input-field-invalid")
  password_field.classList.remove("input-field-invalid")
  message_display.text = ''
})