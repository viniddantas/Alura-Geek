import { produtoService } from "../service/produto-service.js"
import { constroiProduto } from "./listaProduto-controller.js"

const url = new URL(window.location)
const categoria = url.searchParams.get('categoria')

const tituloCategoria = document.querySelector('[data-produto-categoria]')
const listaProdutos = document.querySelector('[data-lista-produtos]')

tituloCategoria.textContent = categoria


const render = async () => {
    const listaApi = await produtoService.listaProdutos()

    
    listaApi.filter((elemento) => elemento.categoria == categoria).forEach((produto => {
        return listaProdutos.appendChild(constroiProduto(produto.id, produto.url, produto.nome, produto.preco))
    }))
}

render()