import validarFormularios  from "./validarFormularios.js";

const campos = document.querySelectorAll("[data-form-input]");

campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarFormularios(campo))
});