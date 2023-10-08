 function validarFormularios(campo) {
    const campoDeErro = campo.nextElementSibling;
    campoDeErro.textContent = ""
    
    tiposDeErro.forEach((erro) => {
        if (campo.validity[erro]) {
            campoDeErro.textContent = mensagens[campo.name][erro];
        }
    });
}

const tiposDeErro = [
    'valueMissing',
    'tooLong',
    'tooShort',
    'typeMismatch'
];

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
    url: {
        valueMissing: 'O campo de url da imagem não pode estar vazio.',
    },
    categoria: {
        valueMissing: 'O campo de categoria não pode estar vazio.',
    },
    produto: {
        valueMissing: 'O campo de produto não pode estar vazio.',
        tooLong: "O nome do produto deve conter no máximo 20 caracteres.",
    },
    preco: {
        valueMissing: 'O campo de preco não pode estar vazio.',
        typeMismatch: "O preço deve conter somente numeros.",
    },
    descrição: {
        valueMissing: 'O campo de descricao não pode estar vazio.',
        tooLong: "O campo de descricao deve conter no máximo 150 caracteres.",
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

export default validarFormularios