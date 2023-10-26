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

export default function constroiCard (id, url, nome, preco) {
    const produto = document.createElement("li")
    produto.className = "produtos__item"
    
    produto.innerHTML = 
    `   
        <div data-id="${id}">
            <img class="produto__imagem" src="${url}" alt="${nome}">
            <div class="produto__informacoes">
                <p class="produto__nome">${nome}</p>
                <h3 class="produto__preco">R$ ${preco}</h3>
                <button class="produto__link" data-detalhes>Ver produto</button>  
            </div>  
        </div>
    `
    return produto
}

async function listaProdutos() {
    const listaApi = await conectaApi.listaProdutos()
    listaApi.forEach(elemento => {
        if(elemento.categoria == 'Consoles') {
            consoles.appendChild(constroiCard(elemento.id, elemento.url, elemento.produto, elemento.preco))
        } else if (elemento.categoria == 'Star Wars') {
            starwars.appendChild(constroiCard(elemento.id, elemento.url, elemento.produto, elemento.preco))
        } else if (elemento.categoria == 'Diversos') {
            diversos.appendChild(constroiCard(elemento.id, elemento.url, elemento.produto, elemento.preco))
        }
    })
}

listaProdutos()