function openModalAtividade() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const date = new Date();
        const options = { timeZone: 'America/Sao_Paulo' };
        const dataHoraBrasil = date.toLocaleString('pt-BR');
  
        document.getElementById("modalContent").innerHTML = xhr.responseText;
        // document.getElementById('dataDeAtividade').defaultValue = new Date().toISOString().substring(0, 10);
        document.getElementById('data').value = getDataAtual();

        var registerForm = document.getElementById("registerForm");
        if (registerForm) {
          registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var titulo = document.getElementById("titulo").value;
            var descricao = document.getElementById("descricao").value;
            var data = document.getElementById("data").value;
            var hora = document.getElementById("hora").value;

            var formData = {
              titulo: titulo,
              descricao: descricao,
              data: data,
              hora: hora
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

  function getDataAtual() {
    var dataAtual = new Date();
    var dia = String(dataAtual.getDate()).padStart(2, '0');
    var mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    var ano = String(dataAtual.getFullYear()).slice(-2); // Pegando os dois últimos dígitos do ano
    return dia + '/' + mes + '/' + ano;
}