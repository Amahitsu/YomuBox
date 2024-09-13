document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formLogin');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log('Tentativa de login...');

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Log para verificar os valores
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      // Busca todos os usuários cadastrados no servidor
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();

      // Verifica se o usuário e senha correspondem a algum registro
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        alert('Login realizado com sucesso!');
        // Redirecionar para a página desejada após o login (por exemplo, página principal)
        window.location.href = './v1/principal.html'
      } else {
        alert('Nome de usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar ao servidor.');
    }
  });
});
