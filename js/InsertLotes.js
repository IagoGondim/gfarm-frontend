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
                  </div>
            `;
      
            var text5Div = document.getElementById('text5');
            text5Div.appendChild(newCard);
        }
        console.log(data);
      })
      .catch(error => console.error('Erro:', error));
  }
  
    fetchAndCreateCard();