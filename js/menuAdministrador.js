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
        <div data-id="${id}">
            <div class="produto__apresentacao">
                <img class="produto__imagem" src="${url}" alt="">
                <div class="produto__alterar">
                    <button class="produto__deletar" data-botao-deletar></button>
                    <button class="produto__editar" data-botao-editar></button>
                </div>
            </div>
            <div class="produto__informacoes">
                <p class="produto__nome">${nome}</p>
                <h3 class="produto__preco">R$ ${preco}</h3>
                <p class="produto__codigo">#${id}</p>
            </div>  
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

lista.addEventListener("click", (event) => {
    const botaoExcluir = event.target.closest("[data-botao-deletar]");
    if (botaoExcluir) {
        const id = botaoExcluir.closest("[data-id]").dataset.id;
        conectaApi.deletaProduto(id);
    }

    // if (event.target.classList.contains("produto__deletar")) {
        
    //     const id = document.querySelector([`data-id=${id}`])
    //     console.log(id)
    // }

    // if (event.target.classList.contains("produto__editar")) {
    //     //codigo
    // }
});
