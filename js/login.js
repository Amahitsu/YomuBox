// JSON com dados de login
const users = [
    {
        "username": "usuario1",
        "password": "senha1"
    }
];

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('formLogin');
    const messageElement = document.getElementById('messageElement');
    const messageOverlay = document.getElementById('messageOverlay');

    if (!form || !messageElement || !messageOverlay) {
        console.error('Elemento(s) do formulário ou da mensagem não encontrado(s).');
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'usuario1' && password === 'senha1') {
            messageElement.textContent = 'Login realizado com sucesso!';
            messageOverlay.style.display = 'flex';
            window.location.href = './v1/principal.html'
        } else {
            messageElement.textContent = 'Nome de usuário ou senha incorretos.';
            messageOverlay.style.display = 'flex';
        }
    });
    // Limpa o formulário
    form.reset();
});