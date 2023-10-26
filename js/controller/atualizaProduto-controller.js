import { produtoService } from "../service/produto-service.js"

const formulario = document.querySelector('[data-form-novo-produto]')
const camposFormulario = document.querySelectorAll('[data-form-input]')

const url = new URL(window.location)
const id = url.searchParams.get('id')

async function insereDados() {
    const dadosProduto = await produtoService.detalhaProduto(id)

    camposFormulario.forEach(campo => {
        campo.name == "url" ?  campo.value = dadosProduto.url : ""
        campo.name == "categoria" ?  campo.value = dadosProduto.categoria : ""
        campo.name == "nome" ?  campo.value = dadosProduto.nome : ""
        campo.name == "preco" ?  campo.value = dadosProduto.preco : ""
        campo.name == "descricao" ?  campo.value = dadosProduto.descricao : ""
    })
}
insereDados()

formulario.addEventListener('submit', async (evento) => {
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

    await produtoService.editaProduto(nome, url, categoria, preco, descricao, id)
    window.location.href = '../../pages/menuAdministrador.html'
})