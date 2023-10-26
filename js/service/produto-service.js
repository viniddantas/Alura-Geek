const apiLink = 'http://localhost:3000/produtos'

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

export const produtoService = {
    listaProdutos,
    criaProduto,
    deletaProduto,
    editaProduto,
    detalhaProduto
}