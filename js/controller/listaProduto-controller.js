import { produtoService } from "../service/produto-service.js"

const starwars = document.querySelector('[data-lista-starwars]')
const consoles = document.querySelector('[data-lista-consoles]')
const diversos = document.querySelector('[data-lista-diversos]')

export function constroiProduto(id, url, nome, preco) {
    const produto = document.createElement('li')
    produto.className = 'produtos__item'

    produto.innerHTML = `
        <img class="produto__imagem" src="${url}" alt="${nome}">
        <div class="produto__informacoes">
            <p class="produto__nome">${nome}</p>
            <h3 class="produto__preco">R$${preco}</h3>
            <a class="produto__link" href="../pages/detalhesProduto.html?id=${id}">Ver produto</a>  
        </div>  
    `
    produto.dataset.id = id

    return produto
}

const render = async () => {
    const listaApi = await produtoService.listaProdutos()
    
    listaApi.forEach(produto => {
        if(produto.categoria == 'Consoles') {
            consoles.appendChild(constroiProduto(produto.id, produto.url, produto.nome, produto.preco))
        } else if (produto.categoria == 'Star Wars') {
            starwars.appendChild(constroiProduto(produto.id, produto.url, produto.nome, produto.preco))
        } else if (produto.categoria == 'Diversos') {
            diversos.appendChild(constroiProduto(produto.id, produto.url, produto.nome, produto.preco))
        } 
    })
}

render()