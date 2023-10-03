import validarFormularios  from "./validarFormularios.js";

const formulario = document.querySelector("[data-form-novo-produto]");
const campos = document.querySelectorAll("[data-form-input]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const valoresDosCampos = {};
    const formData = new FormData(formulario);

    formData.forEach((valor, name) => {
        valoresDosCampos[name] = valor;
    })

    console.log(valoresDosCampos);
});

campos.forEach((campo) => {
    campo.addEventListener("blur", () => {
        validarFormularios(campo)
    })
});