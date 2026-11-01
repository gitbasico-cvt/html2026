/* ================================================= */
/* REQUISIÇÕES HTTP, FETCH E JSON                    */
/* ================================================= */

document.addEventListener("DOMContentLoaded", function () {
    
    // Captura o container onde a lista de produtos será renderizada
    const containerLista = document.getElementById("lista-produtos");

    if (containerLista) {
        // 1. Mensagem de feedback enquanto a requisição está sendo processada
        containerLista.innerHTML = "<p>Carregando produtos do servidor...</p>";

        // 2. Requisição HTTP GET para buscar os dados em formato JSON
        fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
            .then(function (resposta) {
                // Converte a resposta em formato JSON para um objeto JavaScript
                return resposta.json();
            })
            .then(function (dadosEmJson) {
                // Limpa o texto de carregamento
                containerLista.innerHTML = "";

                // Cria uma estrutura de lista <ul> no DOM
                const ul = document.createElement("ul");
                ul.style.listStyle = "none";
                ul.style.padding = "0";

                // Percorre o array JSON e constrói cada item da lista
                dadosEmJson.forEach(function (item) {
                    const li = document.createElement("li");
                    li.className = "menu-opcao"; // Mantém os estilos do CSS
                    li.style.marginBottom = "10px";
                    
                    li.innerHTML = `
                        <div>
                            <strong>Produto #${item.id}</strong>
                            <p>${item.title}</p>
                        </div>
                        <span style="color: green;">Em Estoque</span>
                    `;
                    ul.appendChild(li);
                });

                // Insere a lista finalizada na página
                containerLista.appendChild(ul);
            })
            .catch(function (erro) {
                console.error("Erro na requisição:", erro);
                containerLista.innerHTML = "<p style='color:red;'>Erro ao carregar os produtos do servidor.</p>";
            });
    }
});