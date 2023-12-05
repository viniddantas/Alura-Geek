const apiLink = 'https://mockapi.io/clone/656f9fd66529ec1c623814fc'

const listaProdutos = async () => {
    const resposta = await fetch(`${apiLink}`)
    if (resposta.ok) {
        return resposta.json()
    }
    throw new Error('Não foi possível listar os produtos')
}

const criaProduto = async (nome, url, categoria, preco, descricao) => {
    const resposta = await fetch(`${apiLink}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            url: url,
            categoria: categoria,
            preco: preco,
            descricao: descricao
        })
    })
    if (resposta.ok) {
        return resposta.body
    }
    throw new Error('Não foi possível criar o produto')
}

const deletaProduto = async (id) => {
    const resposta = await fetch(`${apiLink}/${id}`, {
        method: 'DELETE'
    })
    if(!resposta.ok) {
        throw new Error('Não foi possível deletar o produto')
    }
}

const editaProduto = async (nome, url, categoria, preco, descricao, id) => {
    const resposta = await fetch(`${apiLink}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            url: url,
            categoria: categoria,
            preco: preco,
            descricao: descricao
        })
    })
    if (resposta.ok) {
        return resposta.json()
    }
    throw new Error('Não foi possível editar o produto')
}

const detalhaProduto = async (id) => {
    const resposta = await fetch(`${apiLink}/${id}`)
    if (resposta.ok) {
        return resposta.json()
    }
    throw new Error('Não foi possível listar o produtos especificado')
}

const pesquisaProduto = async (valor) => {
    const resposta = await fetch(`${apiLink}`)
    if(resposta.ok) {
        const elementos = await resposta.json()
        return elementos.filter(elemento => {
            return elemento.nome.toLowerCase().includes(valor.toLowerCase())
        })
    }
    throw new Error('Não foi possível pesquisar pelo produto')
}

export const produtoService = {
    listaProdutos,
    criaProduto,
    deletaProduto,
    editaProduto,
    detalhaProduto,
    pesquisaProduto
}
