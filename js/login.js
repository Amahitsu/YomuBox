// JSON com dados de login
const users = [
    {
        "username": "usuario1",
        "password": "senha1"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formLogin');
    const messageElement = document.getElementById('message');

    // Verifica se os elementos foram encontrados
    if (!form || !messageElement) {
        console.error('Formulário ou mensagem não encontrado.');
        return;
    }

    // Manipulador de evento de envio do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obtém os valores dos inputs
        const getUsername = document.getElementById('username').value;
        const getPassword = document.getElementById('password').value;

        // Verifica se o usuário e senha existem no JSON
        const user = users.find(u => u.username === getUsername && u.password === getPassword);

        if (user) {
            window.location.href = "/v1/principal.html";

        } else {
            alert("Nome de usuário ou senha incorretos.");
        }

        // Limpa o formulário
        form.reset();
    });
});
