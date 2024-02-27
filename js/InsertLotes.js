function fetchAndCreateCard() {
    var token = localStorage.getItem('token');
            console.log(token);
            fetch('http://localhost:8080/usuario/lotes', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            })
      .then(response => {return response.json();})
      .then(data => {
        console.log(data);
        if (data[0]?.id){
          localStorage.setItem("loteId", data[0]?.id)
        }
        for (let Lote of data){
            console.log(Lote);
            var newCard = document.createElement('div');
            newCard.classList.add('card');
      
            newCard.innerHTML = `
                  <img src="../img/BannerLote.jpg" alt="ImagemCard">
                  <div class="card-content">
                      <h2>${Lote?.nome}</h2>
                      <p>Nome do Lote: ${Lote?.nome}</p>
                      <p>Área Total do Lote: ${Lote?.areaTotalLote} metros quadrados</p>
                      <p>Tipo de Solo: ${Lote?.tipoDeSolo}</p>
                      <button class="delete-button-lote" data-lote-id="${Lote?.id}">Excluir Lote</button>
                  </div>
            `;
      
            var text5Div = document.getElementById('text5');
            text5Div.appendChild(newCard);
        }
        var deleteButtons = document.querySelectorAll('.delete-button-lote');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                var loteId = button.getAttribute('data-lote-id');
                deleteLote(loteId);
            });
        });
        
        console.log(data);
    })
    .catch(error => console.error('Erro:', error));
}

function deleteLote(loteId) {
    var token = localStorage.getItem('token');
    fetch(`http://localhost:8080/usuario/lotes/${loteId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir lote.');
        }
        alert('Lote Excluído com Sucesso!');
        location.reload();
    })
    .catch(error => console.log('Erro ao excluir lote:', error.message));
}
  
    fetchAndCreateCard();