async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/produtos")
    const conexaoConvertida = await conexao.json()
    
    return conexaoConvertida
}

async function criaProduto(url, categoria, nome, preco, descricao) {
    const conexao = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            url: url,
            categoria: categoria,
            nome: nome,
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


export const conectaApi = {
    listaProdutos, criaProduto, deletaProduto,
}
