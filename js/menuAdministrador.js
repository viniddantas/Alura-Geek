import validarFormularios  from "./validarFormularios.js";
import { conectaApi } from "./conectaApi.js";

const campos = document.querySelectorAll("[data-form-input]");
const lista = document.querySelector("[data-lista-produtos]");

campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarFormularios(campo))
});

function constroiCard (url, nome, preco, id) {
    console.log("Constroi card")
    const produto = document.createElement("li")
    produto.className = "produtos__item"
    
    produto.innerHTML = 
    `
        <div class="produto__apresentacao">
            <img class="produto__imagem" src="${url}" alt="">
            <div class="produto__alterar">
                <a href="#"><img src="./../assets/img/icones/lixeira.svg" alt="Icone excluir"></a>
                <a href="#"><img src="./../assets/img/icones/editar.svg" alt="Icone editar"></a>
            </div>
        </div>
        <div class="produto__informacoes">
            <p class="produto__nome">${nome}</p>
            <h3 class="produto__preco">${preco}</h3>
            <p class="produto__codigo">#${id}</p>
        </div>  
    `
    return produto
}

async function listaProdutos() {
    console.log("Lista Produtos")
    const listaApi = await conectaApi.listaProdutos()
    console.log(listaApi)
    listaApi.forEach(elemento => {
        lista.appendChild(constroiCard(elemento.url, elemento.nome, elemento.preco, elemento.id))
    })
}

listaProdutos()