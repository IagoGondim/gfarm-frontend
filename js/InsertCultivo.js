function fetchAndCreateCard() {
    var token = localStorage.getItem('token');
            console.log(token);
            fetch('http://localhost:8080/usuario/cultivos', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            })
      .then(response => {return response.json();})
      .then(data => {
        console.log(data);
        for (let Cultivo of data){
            console.log(Cultivo);
            var newCard = document.createElement('div');
            newCard.classList.add('card');
      
            newCard.innerHTML = `
                  <img src="../img/BannerCultivo.jpg" alt="ImagemCard">
                  <div class="card-content">
                      <h2>${Cultivo?.nome}</h2>
                      <p>Descrição de Cultivo: ${Cultivo?.descricao}</p>
                      <p>Data de Plantio: ${Cultivo?.dataDePlantio}</p>
                      <p>Data de Colheita: ${Cultivo?.dataColheita}</p>
                      <p>Data de Colheita Prevista: ${Cultivo?.dataColheitaPrevista}</p>
                      <p>Quantidade Colhida: ${Cultivo?.quantidadeColhida} ${Cultivo?.nome}</p>
                      <button class="delete-button-cultivo" data-cultivo-id="${Cultivo?.id}">Excluir Cultivo</button>
                  </div>
            `;
      
            var text6Div = document.getElementById('text6');
            text6Div.appendChild(newCard);
        }
        var deleteButtons = document.querySelectorAll('.delete-button-cultivo');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                var cultivoId = button.getAttribute('data-cultivo-id');
                deleteCultivo(cultivoId);
            });
        });
        
        console.log(data);
    })
    .catch(error => console.error('Erro:', error));
}

function deleteCultivo(cultivoId) {
    var token = localStorage.getItem('token');
    fetch(`http://localhost:8080/usuario/cultivos/${cultivoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir Cultivo.');
        }
        alert('Cultivo Excluído com Sucesso!');
        location.reload();
    })
    .catch(error => console.log('Erro ao excluir cultivo:', error.message));
}
  
    fetchAndCreateCard();