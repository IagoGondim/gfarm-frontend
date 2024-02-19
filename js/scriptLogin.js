document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) { // Verifica se o formulário existe antes de adicionar o event listener
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const userData = {
        username: formData.get('email'),
        password: formData.get('password')
      };

      fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.');
          }
          return response.json();
        })
        .then(data => {
          console.log('Token de autenticação:', data.token);
          alert('Login bem-sucedido!');
          localStorage.setItem('token', data.token);
          window.location.href = 'dashboard.html';
        })
        .catch(error => {
          console.error('Erro ao fazer login:', error.message);
          alert(error.message);
        });
    });
  }
});