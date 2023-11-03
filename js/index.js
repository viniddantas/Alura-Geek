import validarFormularios  from "./validarFormularios.js";
import { conectaApi } from "./conectaApi.js"

const campos = document.querySelectorAll("[data-form-input]");

const starwars = document.querySelector("[data-lista-starwars]")
const consoles = document.querySelector("[data-lista-consoles]")
const diversos = document.querySelector("[data-lista-diversos]")

const listas = document.querySelectorAll("[data-lista-starwars], [data-lista-consoles], [data-lista-diversos]")

listas.forEach((lista) => {
    lista.addEventListener("click", async (event) => {
        const botaoDetalhes = event.target.closest("[data-detalhes]");
        if(botaoDetalhes) {
            const id = botaoDetalhes.closest("[data-id]").dataset.id;
            const dados = await conectaApi.buscaVideo(id)
            var dadosCodificados = encodeURIComponent(JSON.stringify(dados));
            
            window.location.href = '/pages/detalhesProduto.html?dados=' + dadosCodificados;
        }
    })
})

campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarFormularios(campo))
});
