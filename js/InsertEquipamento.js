function fetchAndCreateCard() {
    var token = localStorage.getItem('token');
            console.log(token);
            fetch('http://localhost:8080/usuario/equipamentos', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            })
      .then(response => {return response.json();})
      .then(data => {
        console.log(data);
        for (let Equipamento of data){
            console.log(Equipamento);
            var newCard = document.createElement('div');
            newCard.classList.add('card');
      
            newCard.innerHTML = `
                  <img src="../img/BannerEquipamento.jpg" alt="ImagemCard">
                  <div class="card-content">
                      <h2>${Equipamento?.nome}</h2>
                      <p>Nome do Equipamento: ${Equipamento?.nome}</p>
                      <p>Descrição do Equipamento: ${Equipamento?.descricao}</p>
                      <p>Data de Compra: ${Equipamento?.dataDeCompra}</p>
                  </div>
            `;
      
            var text4Div = document.getElementById('text4');
            text4Div.appendChild(newCard);
        }
        console.log(data);
      })
      .catch(error => console.error('Erro:', error));
  }
  
    fetchAndCreateCard();