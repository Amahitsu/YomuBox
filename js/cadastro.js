document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formCadastro');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      console.log('Formulário enviado');
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const redirect = "\\" + "index.html";
  
      // Log para verificar os valores
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
  
      // Verificação das senhas
      if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });

        if (response.ok) {
          alert('Usuário cadastrado com sucesso!');
          window.location.href = redirect; // Redireciona para a página de login após o cadastro
        } else {
          alert('Erro ao cadastrar o usuário.');
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar ao servidor.');
        window.location.href = redirect; // Redireciona para a página de login após o cadastro
      }
    });
  });
  