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
                  </div>
            `;
      
            var text6Div = document.getElementById('text6');
            text6Div.appendChild(newCard);
        }
        console.log(data);
      })
      .catch(error => console.error('Erro:', error));
  }
  
    fetchAndCreateCard();