const formulario = document.querySelector("[data-form-login]")
const campoDeErro = document.querySelector("[data-login-invalido]")

formulario.addEventListener("submit", (event) => {
    event.preventDefault()
    campoDeErro.textContent = ""

    const email = document.querySelector("[data-email]").value
    const senha = document.querySelector("[data-senha]").value

    const dados = {email, senha}

    if(dados.email == "vini.dantas61@gmail.com" && dados.senha == "dantas7530") {
        window.location.href = "/pages/menuAdministrador.html";
    } else {
        campoDeErro.textContent = "Digite a senha corretamente"
    }
})

