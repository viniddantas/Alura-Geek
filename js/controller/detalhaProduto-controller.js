import { produtoService } from "../service/produto-service.js"

const produtoPrincipal = document.querySelector('[data-produto]')
const produtosSimiliares = document.querySelector('[data-produtos-similiares]')

const url = new URL(window.location)
const id = url.searchParams.get('id')


async function constroiProdutoPrincipal(){
    const dadosProduto = await produtoService.detalhaProduto(id)
    
    produtoPrincipal.innerHTML = `
        <img class="detalhes__imagem" src="${dadosProduto.url}" alt="">
        <div class="detalhes__container">
            <h2 class="detalhes__nome">${dadosProduto.nome}</h2>
            <h3 class="detalhes__preco">R$ ${dadosProduto.preco}</h3>
            <p class="detalhes__descricao">${dadosProduto.descricao}</p>
        </div>
    `
}
constroiProdutoPrincipal()

const apiLista = await produtoService.listaProdutos()
const produtosFiltrados = apiLista.filter((produto) => produto.id != id)

produtosFiltrados.forEach(produto => {
    produtosSimiliares.appendChild(constroiProdutosSimiliares(produto.id, produto.url, produto.nome, produto.preco))
})

function constroiProdutosSimiliares(id, url, nome, preco) {
    const produtosSimiliares = document.createElement('li')
    produtosSimiliares.className = 'produtos__item'

    produtosSimiliares.innerHTML = `
        <img class="produto__imagem" src="${url}" alt="${nome}">
        <div class="produto__informacoes">
            <p class="produto__nome">${nome}</p>
            <h3 class="produto__preco">R$${preco}</h3>
            <a class="produto__link" href="../../pages/detalhesProduto.html?id=${id}">Ver produto</a>  
        </div>  
    `
    produtosSimiliares.dataset.id = id
    
    return produtosSimiliares
}