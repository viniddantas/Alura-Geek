const camposDoFormulario = document.querySelectorAll("[required]")
const botaoEnviarMensagem = document.querySelector("[data-enviar-mensagem]")
const botaoEntrar = document.querySelector("[data-entrar]")


if(window.location.pathname == "/pages/login.html") {
    botaoEntrar.classList.add('formulario__submit-desabilitado')
}

botaoEnviarMensagem.classList.add('formulario__submit-desabilitado')

//console.log(camposDoFormulario)

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () =>  validaCampo(campo))
})

function validaCampo(campo) {
    let formularioContatoValido = true
    let formularioLoginValido = true

    const campoDeErro = campo.nextElementSibling
    campoDeErro.textContent = ""
    
    tiposDeErro.forEach((erro) => {
        if (campo.validity[erro]) {
            campoDeErro.textContent = mensagens[campo.name][erro]
        }
    })

    camposDoFormulario.forEach(campo => {
        tiposDeErro.forEach((erro) => {
            if (!(campo.name == "email" || campo.name == "senha"))
            {
                if (campo.validity[erro]){
                    formularioContatoValido = false;
                }
            }
            if (campo.name == "email" || campo.name == "senha")
            {
                if (campo.validity[erro]){
                    formularioLoginValido = false;
                }
            }
        })
    })
    
    if(window.location.pathname == "/pages/login.html") {
        verificaFormulario(botaoEntrar, formularioLoginValido)
    }
    verificaFormulario(botaoEnviarMensagem, formularioContatoValido)
}

/*Verifica se o formulário foi prenchido corretamente e habilita o botao*/
function verificaFormulario(botao, formulario) {
    if (formulario == true) {
        botao.classList.remove('formulario__submit-desabilitado')
        botao.classList.add('formulario__submit-habilitado')
        botao.disabled = false
    } else {
        botao.classList.remove('formulario__submit-habilitado')
        botao.classList.add('formulario__submit-desabilitado')
        botao.disabled = true
    }
}

const tiposDeErro = [
    'valueMissing',
    'tooLong',
    'tooShort',
    'typeMismatch'
]

const mensagens = {
    email: {
        valueMissing: "O campo de email não pode estar vazio.",
        tooShort: "Por favor, preencha um e-mail válido.",
        typeMismatch: "Por favor, preencha um email válido.",
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        tooShort: "A senha deve ter no mínimo 4 dígitos",
    },
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        tooLong: "O nome é muito grande.",
        tooShort: "Por favor, preencha um nome válido.",
    },
    mensagem: {
        valueMissing: 'O campo de mensagem não pode estar vazio.',
        tooLong: "O campo de mensagem deve conter no máximo 300 caracteres",
        tooShort: "O campo de mensagem não tem caractéres suficientes.",
    },
}