import validarFormularios  from "./validarFormularios.js";
import { conectaApi } from "./conectaApi.js";

const formulario = document.querySelector("[data-form-novo-produto]");
const campos = document.querySelectorAll("[data-form-input]");
const campoPreco = document.getElementById('preco');

var parametros = new URLSearchParams(window.location.search);
var dadosCodificados = parametros.get('dados');
var dados = JSON.parse(decodeURIComponent(dadosCodificados));

colocaDados()

function colocaDados(){

    
    if (dados && window.location.href.includes("editarProduto")) {
        console.log("Pagina certa")
        campos.forEach((campo) => {
            campo.name == "url" ? campo.value = dados.url : ""
            campo.name == "categoria" ? campo.value = dados.categoria : ""
            campo.name == "produto" ? campo.value = dados.produto : ""
            campo.name == "preco" ? campo.value = dados.preco : ""
            campo.name == "descricao" ? campo.value = dados.descricao : ""
        })
        //conectaApi.editaProduto(dados.id, dados)
    } else {
        console.log("false")
    }
}

formulario.addEventListener("submit",  (evento) => {
    evento.preventDefault();

    const valoresDosCampos = {};
    const formData = new FormData(formulario);

    formData.forEach((valor, name) => {
        valoresDosCampos[name] = valor;
    })
    
    valoresDosCampos.preco = valoresDosCampos.preco.replace(/^R\$ /, '');

    if(window.location.href.includes("novoProduto")) {
        criarProduto(valoresDosCampos)
    } else if(window.location.href.includes("editarProduto")) {
        console.log(dados);
        conectaApi.editaProduto(dados.id, valoresDosCampos)
        window.location.href = "../pages/menuAdministrador.html"
    }
    
    
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
    const produto = valoresDosCampos.produto
    const preco = valoresDosCampos.preco
    const descricao = valoresDosCampos.descricao

    await conectaApi.criaProduto(url, categoria, produto, preco, descricao)

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

