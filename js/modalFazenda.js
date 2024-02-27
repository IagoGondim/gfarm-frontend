function openModalFazenda() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById("modalContent").innerHTML = xhr.responseText;

        var registerForm = document.getElementById("registerForm");
        if (registerForm) {
          registerForm.addEventListener("submit", function (event) {
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
            console.log(formData);
            console.log(token);
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
                location.reload();
              })
              .catch(error => {
                console.error('Erro ao cadastrar fazenda:', error.message);
                alert(error.message);
              });
          });
        }
      }
    };
    xhr.open("GET", "../html/modalContent.html", true);
    xhr.send();
  }

  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }