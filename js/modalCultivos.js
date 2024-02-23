function openModalCultivo() {
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
            var descricao = document.getElementById("descricao").value;
            var dataDePlantio = document.getElementById("dataDePlantio").value;
            var dataColheitaPrevista = document.getElementById("dataColheitaPrevista").value;
            var dataColheita = document.getElementById("dataColheita").value;
            var quantidadeColhida = document.getElementById("quantidadeColhida").value;
            var loteId = localStorage.getItem("loteId");

            var formData = {
                nome: nome,
                descricao: descricao,
                dataDePlantio: dataDePlantio,
                dataColheitaPrevista: dataColheitaPrevista,
                dataColheita: dataColheita,
                quantidadeColhida: quantidadeColhida,
                loteId: loteId
    };

    var token = localStorage.getItem('token');
            console.log(formData);
            console.log(token);
            fetch('http://localhost:8080/usuario/cultivos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(formData)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Erro ao inserir cultivo. Por favor, tente novamente.');
                }
                return response.json();
              })
              .then(data => {
                console.log('Cultivo inserido com sucesso:', data);
                alert('Cultivo inserido com sucesso!');
                closeModal();
              })
              .catch(error => {
                console.error('Erro ao inserir cultivo:', error.message);
                alert(error.message);
              });
          });
        }
      }
    };
    xhr.open("GET", "../html/modalCultivos.html", true);
    xhr.send();
  }
  
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}


