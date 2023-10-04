import validarFormularios  from "./validarFormularios.js";
import { conectaApi } from "./conectaApi.js"

const campos = document.querySelectorAll("[data-form-input]");

const starwars = document.querySelector("[data-lista-starwars]")
const consoles = document.querySelector("[data-lista-consoles]")
const diversos = document.querySelector("[data-lista-diversos]")

console.log(starwars)
console.log(consoles)
console.log(diversos)

campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarFormularios(campo))
});



export default function constroiCard (url, nome, preco) {
    console.log("Constroi card")
    const produto = document.createElement("li")
    produto.className = "produtos__item"
    
    produto.innerHTML = 
    `
        <img class="produto__imagem" src="${url}" alt="${nome}">
        <div class="produto__informacoes">
            <p class="produto__nome">${nome}</p>
            <h3 class="produto__preco">R$${preco}</h3>
            <a class="produto__link" href="#">Ver produto</a>  
        </div>  
    `
    return produto
}

async function listaProdutos() {
    console.log("Lista Produtos")
    const listaApi = await conectaApi.listaProdutos()
    console.log(listaApi)
    listaApi.forEach(elemento => {
        if(elemento.categoria == 'Consoles') {
            console.log("Consoles")
            consoles.appendChild(constroiCard(elemento.url, elemento.nome, elemento.preco))
        } else if (elemento.categoria == 'Star Wars') {
            console.log("Star Wars")
            starwars.appendChild(constroiCard(elemento.url, elemento.nome, elemento.preco))
        } else if (elemento.categoria == 'Diversos') {
            console.log("Diversos")
            diversos.appendChild(constroiCard(elemento.url, elemento.nome, elemento.preco))
        }
    })
}

listaProdutos()