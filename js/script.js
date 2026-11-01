/* ================================================= */
/* DOM E MANIPULAÇÃO DE EVENTOS - ESTOQUE FÁCIL       */
/* ================================================= */

// Aguarda o carregamento completo da página para rodar o script
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. SELEÇÃO DE ELEMENTOS DO DOM
    // Capturamos o formulário de cadastro pelo seletor
    const formularioCadastro = document.querySelector("form");

    // Verificamos se o formulário realmente existe na página atual antes de adicionar o evento
    if (formularioCadastro) {
        
        // 2. ADIÇÃO DE EVENTO (Escutando o envio do formulário)
        formularioCadastro.addEventListener("submit", function (evento) {
            
            // Impede o comportamento padrão de recarregar a página ao enviar o form
            evento.preventDefault();

            // Capturamos os valores digitados nos inputs usando o DOM
            const nomeInput = document.querySelector('input[type="text"]');
            const qtdInput = document.querySelector('input[type="number"]');

            const nomeProduto = nomeInput.value;
            const quantidade = qtdInput.value;

            // Validação simples
            if (nomeProduto === "" || quantidade === "") {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            // 3. MANIPULAÇÃO DO DOM (Feedback visual dinâmico)
            // Criamos um elemento de parágrafo dinamicamente via JavaScript
            const mensagemSucesso = document.createElement("p");
            mensagemSucesso.style.color = "green";
            mensagemSucesso.style.fontWeight = "bold";
            mensagemSucesso.style.marginTop = "10px";
            mensagemSucesso.textContent = `Sucesso! O produto "${nomeProduto}" (${quantidade} unidades) foi cadastrado.`;

            // Adicionamos a mensagem logo abaixo do formulário no DOM
            formularioCadastro.appendChild(mensagemSucesso);

            // Limpa os campos do formulário após o cadastro
            formularioCadastro.reset();
        });
    }
});