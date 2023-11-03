import { produtoService } from "../service/produto-service.js"

const barraPesquisa = document.getElementById('campoPesquisa')
const campoDeBusca = document.querySelector("[data-botao-busca]")
const menuProdutos = document.querySelector("[data-produtos-pesquisa]")

campoDeBusca.addEventListener('keyup', _.debounce(buscarProduto, 400))


async function buscarProduto() {
    barraPesquisa.style.borderRadius = "20px"
    if (menuProdutos.children.length > 0) {
        const produtosPesquisados = Array.from(menuProdutos.children) 
        produtosPesquisados.forEach((elemento) => {
            elemento.remove()
        })
    }
    if(campoDeBusca.value.trim() != '') {
        barraPesquisa.style.borderRadius = "20px 20px 0 0"
        const produtosFiltrados = await produtoService.pesquisaProduto(campoDeBusca.value)
        exibeProdutosNaPesquisa(produtosFiltrados)
    }
}

function exibeProdutosNaPesquisa(produtos) {
    produtos.forEach(produto => {
        menuProdutos.appendChild(constroiProduto(produto.id, produto.url, produto.nome))
    })
}

function constroiProduto(id, url, nome) {
    const produto = document.createElement('li')
    produto.className = 'pesquisa__produto'

    produto.innerHTML = `
        <a class="lista-item__link" href="./pages/detalhesProduto.html?id=${id}">
            <img class="lista-item__imagem" src="${url}" alt="${nome}">
            <h3 class="lista-item__titulo">${nome}</h3>
        </a>
    `
    produto.dataset.id = id

    return produto
}

