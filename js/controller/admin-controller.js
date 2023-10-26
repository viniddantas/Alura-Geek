import { produtoService } from "../service/produto-service.js"

const listaProdutos = document.querySelector('[data-lista-produtos]')


function constroiProduto(id, url, nome, preco, categoria) {
    const produto = document.createElement('li')
    produto.className = 'produtos__item'

    produto.innerHTML = `
        <div class="produto__apresentacao">
            <img class="produto__imagem" src="${url}" alt="${nome}">
            <div class="produto__alterar">
                <a class="produto__deletar" data-botao-deletar></a>
                <a class="produto__editar" 
                    href="../../pages/editarProduto.html?id=${id}" 
                    data-botao-editar>
                </a>
            </div>
        </div>
        <div class="produto__informacoes">
            <p class="produto__nome">${nome}</p>
            <h3 class="produto__preco">R$${preco}</h3>
            <p class="produto__codigo">#${id}</p>
        </div>  
    `
    produto.dataset.id = id

    return produto
}


const render = async () => {
    const listaApi = await produtoService.listaProdutos()
    
    listaApi.forEach(produto => {
        listaProdutos.appendChild(constroiProduto(produto.id, produto.url, produto.nome, produto.preco, produto.categoria, produto.descricao))
    })
}

render()


listaProdutos.addEventListener('click', async (evento) => {
    let ehBotaoDeletar = evento.target.dataset['botaoDeletar'] !== undefined
    if(ehBotaoDeletar) {
        const botaoDeletar = evento.target.closest('[data-id]')
        let id = botaoDeletar.dataset.id
        produtoService.deletaProduto(id)
    }
})


