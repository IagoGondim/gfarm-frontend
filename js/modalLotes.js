function openModalLote() {
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
            var areaTotalLote = document.getElementById("areaTotalLote").value;
            var role = document.getElementById("role").value;
            var fazendaId = localStorage.getItem("fazendaId");

            var formData = {
                nome: nome,
                areaTotalLote: areaTotalLote,
                tipoDeSolo: role,
                fazendaId: fazendaId
    };

    var token = localStorage.getItem('token');
            console.log(formData);
            console.log(token);
            fetch('http://localhost:8080/usuario/lotes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(formData)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Erro ao inserir lote. Por favor, tente novamente.');
                }
                return response.json();
              })
              .then(data => {
                console.log('Lote inserido com sucesso:', data);
                alert('Lote inserido com sucesso!');
                closeModal();
              })
              .catch(error => {
                console.error('Erro ao inserir lote:', error.message);
                alert(error.message);
              });
          });
        }
      }
    };
    xhr.open("GET", "../html/modalLotes.html", true);
    xhr.send();
  }
  
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}


