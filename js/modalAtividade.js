function openModalAtividade() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const data = new Date();
        const options = { timeZone: 'America/Sao_Paulo' };
        const dataHoraBrasil = data.toLocaleString('pt-BR', options);
  
        document.getElementById("modalContent").innerHTML = xhr.responseText;
        // document.getElementById('dataDeAtividade').defaultValue = new Date().toISOString().substring(0, 10);
        document.getElementById('dataDeAtividade').defaultValue = dataHoraBrasil;

        var registerForm = document.getElementById("registerForm");
        if (registerForm) {
          registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var titulo = document.getElementById("titulo").value;
            var descricao = document.getElementById("descricao").value;
            var dataDeAtividade = document.getElementById("dataDeAtividade").value;

            var formData = {
              titulo: titulo,
              descricao: descricao,
              dataDeAtividade: dataDeAtividade
            };

            var token = localStorage.getItem('token');
            console.log(formData);
            console.log(token);
            fetch('http://localhost:8080/usuario/atividades-agricolas', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(formData)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Erro ao criar atividade. Por favor, tente novamente.');
                }
                return response.json();
              })
              .then(data => {
                console.log('Atividade criada com sucesso:', data);
                alert('Atividade criada com sucesso!');
                closeModal();
              })
              .catch(error => {
                console.error('Erro ao criar atividade:', error.message);
                alert(error.message);
              });
          });
        }
      }
    };
    xhr.open("GET", "../html/modalAtividades.html", true);
    xhr.send();
  }

  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }