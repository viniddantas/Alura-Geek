import validarFormularios  from "./validarFormularios.js";
import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-form-novo-produto]");
const campos = document.querySelectorAll("[data-form-input]");
const campoPreco = document.getElementById('preco');

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const valoresDosCampos = {};
    const formData = new FormData(formulario);

    formData.forEach((valor, name) => {
        valoresDosCampos[name] = valor;
    })
    
    valoresDosCampos.preco = valoresDosCampos.preco.replace(/^R\$ /, '');

    criarProduto(valoresDosCampos)

    console.log(valoresDosCampos);
});

campos.forEach((campo) => {
    campo.addEventListener("blur", () => {
        validarFormularios(campo)
    })
});

async function criarProduto(valoresDosCampos) {

    const url = valoresDosCampos.url
    const categoria = valoresDosCampos.categoria
    const nome = valoresDosCampos.produto
    const preco = valoresDosCampos.preco
    const descricao = valoresDosCampos.descricao

    await conectaApi.criaProduto(url, categoria, nome, preco, descricao)

    window.location.href = "../pages/envioConcluido.html"
}

campoPreco.addEventListener('input', (event) => {
    // Obtém o valor atual do input
    let inputValue = event.target.value;

    // Remove todos os caracteres que não são números
    inputValue = inputValue.replace(/\D/g, '');

    // Converte o valor para número e formata com duas casas decimais
    inputValue = (parseFloat(inputValue) / 100).toFixed(2);
    
    // Adiciona "R$" no início do valor formatado
    inputValue = 'R$ ' + inputValue;

    // Substitui o ponto por vírgula para o separador decimal
    inputValue = inputValue.replace('.', ',');

    // Adiciona um ponto a cada três dígitos inteiros, exceto no início
    inputValue = inputValue.replace(/(?=(\d{3})+(\D))\B/g, '.');

    // Define o valor do input formatado
    event.target.value = inputValue;
});