import { produtoService } from "../service/produto-service.js"
import { constroiProduto } from "./listaProduto-controller.js"

const listaProdutos = document.querySelector('[data-lista-produtos]')

const render = async () => {
    const listaApi = await produtoService.listaProdutos()
    
    listaApi.forEach(produto => {
        listaProdutos.appendChild(constroiProduto(produto.id, produto.url, produto.nome, produto.preco))
    })
}

render()