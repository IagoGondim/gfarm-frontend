function openModalInsumo() {
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
            var role = document.getElementById("role").value;
            var quantidadeDisponivel = document.getElementById("quantidadeDisponivel").value;
            var precoUnitario = document.getElementById("precoUnitario").value;

            var formData = {
              nome: nome,
              role: role,
              quantidadeDisponivel: parseInt(quantidadeDisponivel),
              precoUnitario: parseInt(precoUnitario)
            };

            var token = localStorage.getItem('token');
            console.log(formData);
            console.log(token);
            fetch('http://localhost:8080/usuario/insumos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(formData)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Erro ao inserir insumo. Por favor, tente novamente.');
                }
                return response.json();
              })
              .then(data => {
                console.log('Insumo inserido com sucesso:', data);
                alert('Insumo inserido com sucesso!');
                closeModal();
              })
              .catch(error => {
                console.error('Erro ao inserir insumo:', error.message);
                alert(error.message);
              });
          });
        }
      }
    };
    xhr.open("GET", "../html/modalInsumos.html", true);
    xhr.send();
  }

  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }