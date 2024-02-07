function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var nome = document.getElementById("nome").value;
  var areaTotal = document.getElementById("areaTotal").value;
  var logradouro = document.getElementById("logradouro").value;
  var numero = document.getElementById("numero").value;
  var bairro = document.getElementById("bairro").value;
  var cidade = document.getElementById("cidade").value;

  var formData = {
    nome: nome,
    areaTotal: parseInt(areaTotal),
    endereco: {
      logradouro: logradouro,
      numero: parseInt(numero),
      bairro: bairro,
      cidade: cidade
    }
  };

  var token = localStorage.getItem('token');

  fetch('http://localhost:8080/usuario/fazendas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar fazenda. Por favor, tente novamente.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fazenda cadastrada com sucesso:', data);
      alert('Fazenda cadastrada com sucesso!');
      closeModal(); 
    })
    .catch(error => {
      console.error('Erro ao cadastrar fazenda:', error.message);
      alert(error.message);
    });
});
