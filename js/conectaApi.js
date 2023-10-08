async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/produtos")
    const conexaoConvertida = await conexao.json()
    
    return conexaoConvertida
}

async function criaProduto(url, categoria, produto, preco, descricao) {
    const conexao = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            url: url,
            categoria: categoria,
            produto: produto,
            preco: preco,
            descricao: descricao,
        })
    })
    
    const conexaoConvertida = await conexao.json()

    return conexaoConvertida
}

async function deletaProduto(id) {
    const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Produto deletado");
    });
    
    const conexaoConvertida = await conexao.json()

    return conexaoConvertida
}

async function editaProduto(id, dados) {
    const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(dados)
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Produto atualizado");
    });
    
    const conexaoConvertida = await conexao.json()

    return conexaoConvertida
}  

async function buscaVideo(termoDeBusca) {
    const conexao = await fetch(`http://localhost:3000/produtos/${termoDeBusca}`)
    const conexaoConvertida = conexao.json()

    return conexaoConvertida
}

export const conectaApi = {
    listaProdutos, criaProduto, deletaProduto, editaProduto, buscaVideo
}
