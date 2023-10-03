import validarFormularios  from "./validarFormularios.js";

const campos = document.querySelectorAll("[data-form-input]");

const formularioLogin = document.querySelector("[data-form-login]")
const campoDeErroLogin = document.querySelector("[data-login-invalido]")

campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarFormularios(campo))
});

formularioLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const valoresDosCampos = {};
    const formData = new FormData(formularioLogin);

    formData.forEach((valor, name) => {
        valoresDosCampos[name] = valor;
    })

    if(valoresDosCampos.email == "vini.dantas61@gmail.com" && valoresDosCampos.senha == "dantas7530") {
        window.location.href = "/pages/menuAdministrador.html";
    } else {
        campoDeErroLogin.textContent = "Digite a senha corretamente"
    }

    console.log(valoresDosCampos);
});