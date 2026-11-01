/* ================================================= */
/* CONSUMO DE API REST E INSPEÇÃO DE JSON            */
/* ================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const btnBuscar = document.getElementById("btn-buscar");
    const inputCep = document.getElementById("input-cep");
    const resultadoDiv = document.getElementById("resultado-api");
    const jsonBrutoPre = document.getElementById("json-bruto"); // Nova referência

    if (btnBuscar) {
        btnBuscar.addEventListener("click", async function () {
            const cep = inputCep.value.trim();

            if (cep.length !== 8) {
                alert("Digite um CEP válido com 8 dígitos!");
                return;
            }

            // Estado de Carregamento
            resultadoDiv.innerHTML = "<p>Consultando a API do ViaCEP, aguarde...</p>";
            jsonBrutoPre.textContent = "Carregando dados da API...";

            try {
                // Requisição HTTP GET assíncrona
                const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const dados = await resposta.json();

                if (dados.erro) {
                    resultadoDiv.innerHTML = "<p style='color: red;'>CEP não encontrado na base de dados.</p>";
                    jsonBrutoPre.textContent = "{ \"erro\": true }";
                    return;
                }

                // 1. Exibe os dados formatados visualmente no DOM
                resultadoDiv.innerHTML = `
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">
                        <p><strong>Logradouro:</strong> ${dados.logradouro || "Não informado"}</p>
                        <p><strong>Bairro:</strong> ${dados.bairro || "Não informado"}</p>
                        <p><strong>Cidade:</strong> ${dados.localidade} - ${dados.uf}</p>
                        <span style="color: green; font-weight: bold;">Dados obtidos com sucesso!</span>
                    </div>
                `;

                // 2. EXIBE O JSON BRUTO: 
                // JSON.stringify transforma o objeto JS de volta em texto JSON formatado (com 2 espaços de indentação)
                jsonBrutoPre.textContent = JSON.stringify(dados, null, 2);

            } catch (erro) {
                console.error("Erro na requisição:", erro);
                resultadoDiv.innerHTML = "<p style='color: red;'>Ocorreu um erro ao conectar com a API.</p>";
                jsonBrutoPre.textContent = "Erro de conexão com o servidor.";
            }
        });
    }
});