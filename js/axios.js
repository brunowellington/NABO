// Função para capturar os dados do formulário e cadastrar o produto
function cadastrarProduto() {
  // Captura os dados do formulário
  const id = document.getElementById("id").value;
  const nome = document.getElementById("nome").value;
  const tipo = document.getElementById("tipo").value;
  const preco = document.getElementById("preco").value;
  const quantidade = document.getElementById("quantidade").value;

  // Objeto contendo os dados do produto
  const produto = {
    id: parseInt(id), // Converte o ID para número
    nomeProduto: nome,
    tipoProduto: tipo,
    precoProduto: preco,
    quantidadeProduto: parseInt(quantidade), // Converte a quantidade para número
  };

  // Headers para a requisição
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Opções da requisição
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(produto),
    redirect: "follow",
    mode: "no-cors", // Usando no-cors
  };

  // Envia dados para a API
  fetch(
    "https://p3ivgdl50h.execute-api.us-east-1.amazonaws.com/prod/produtos",
    requestOptions
  )
    .then((response) => {
      // A resposta não pode ser acessada em no-cors
      console.log("Produto cadastrado com sucesso!");
      alert("Produto cadastrado com sucesso!");
      // Limpar os campos do formulário
      document.getElementById("produtos-form").reset();

      // Atualizar a lista de produtos após o cadastro
      listarProdutos();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar o produto:", error);
      alert("Erro ao cadastrar o produto.");
    });
}

async function listarProdutos() {
  try {
    const response = await fetch(
      "https://p3ivgdl50h.execute-api.us-east-1.amazonaws.com/prod/produtos"
    );

    const produtos = await response.json();
    console.log("Produtos listados:", response);

    const tabelaProdutos = document.querySelector("#produtos-table tbody");
    tabelaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
          <td>${produto.id}</td>
          <td>${produto.nomeProduto}</td>
          <td>${produto.tipoProduto}</td>
          <td>${produto.precoProduto}</td>
          <td>${produto.quantidadeProduto}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="excluirProduto(${produto.id})">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
      tabelaProdutos.appendChild(linha);
    });
  } catch (error) {
    console.log("Erro ao listar produtos:", error);
  }
}

async function excluirProduto(id) {
  if (confirm("Tem certeza que deseja excluir este Produto?")) {
    try {
      const response = await fetch(
        `https://p3ivgdl50h.execute-api.us-east-1.amazonaws.com/prod/produtos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Produto excluído com sucesso!");
        listarProdutos(); // Recarrega a lista de Produtos
      } else {
        alert("Erro ao excluir Produto");
      }
    } catch (error) {
      console.error("Erro ao excluir Produto:", error);
    }
  }
}
