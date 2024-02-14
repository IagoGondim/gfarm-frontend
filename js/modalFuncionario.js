function openModalFuncionario() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const data = new Date();
        const options = { timeZone: 'America/Sao_Paulo' };
        const dataHoraBrasil = data.toLocaleString('pt-BR', options);

        document.getElementById("modalContent").innerHTML = xhr.responseText;
        document.getElementById('dataContratacao').defaultValue = dataHoraBrasil;

        var registerForm = document.getElementById("registerForm");
        if (registerForm) {
          registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var nome = document.getElementById("nome").value;
            var cargo = document.getElementById("cargo").value;
            var salario = document.getElementById("salario").value;
            var dataContratacao = document.getElementById("dataContratacao").value;

            var formData = {
              nome: nome,
              cargo: cargo,
              salario: salario,
              dataContratacao: dataContratacao
            };

            var token = localStorage.getItem('token');
            console.log(formData);
            console.log(token);
            fetch('http://localhost:8080/usuario/funcionarios', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(formData)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Erro ao cadastrar funcionario. Por favor, tente novamente.');
                }
                return response.json();
              })
              .then(data => {
                console.log('Funcionario cadastrado com sucesso:', data);
                alert('Funcionario cadastrado com sucesso!');
                closeModal();
              })
              .catch(error => {
                console.error('Erro ao cadastrar funcionario:', error.message);
                alert(error.message);
              });
          });
        }
      }
    };
    xhr.open("GET", "../html/modalFuncionario.html", true);
    xhr.send();
  }

  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }