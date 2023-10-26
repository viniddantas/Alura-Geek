import { produtoService } from "../service/produto-service.js";

const formulario = document.querySelector('[data-form-novo-produto]')

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const valoresDosCampos = {};
    const formData = new FormData(formulario);

    formData.forEach((valor, name) => {
        valoresDosCampos[name] = valor;
    })

    const nome = valoresDosCampos.nome
    const url = valoresDosCampos.url
    const categoria = valoresDosCampos.categoria
    const preco = valoresDosCampos.preco
    const descricao = valoresDosCampos.descricao

    produtoService.criaProduto(nome, url, categoria, preco, descricao)
})