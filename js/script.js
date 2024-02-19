document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const userData = {
    nome: formData.get('usuario'),
    cpf: formData.get('cpf'),
    email: formData.get('email'),
    password: formData.get('senha'),
    role: formData.get('role')
  };

  fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao registrar. Por favor, tente novamente mais tarde.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Registro realizado com sucesso:', data);
      alert('Registro realizado com sucesso!');
      window.location.href = 'login.html';
    })
    .catch(error => {
      console.error('Erro ao registrar:', error.message);
      alert(error.message);
    });
});
