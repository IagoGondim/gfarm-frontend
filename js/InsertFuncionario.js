function fetchAndCreateCard() {
    var token = localStorage.getItem('token');
            console.log(token);
            fetch('http://localhost:8080/usuario/funcionarios', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            })
      .then(response => {return response.json();})
      .then(data => {
        console.log(data);
        for (let Pessoa of data){
            console.log(Pessoa);
            var newCard = document.createElement('div');
            newCard.classList.add('card');
      
            newCard.innerHTML = `
                  <img src="../img/BannerUsuario.jpg" alt="ImagemCard">
                  <div class="card-content">
                      <h2>Usuário: ${Pessoa?.nome}</h2>
                      <p>Nome Completo: ${Pessoa?.nome}</p>
                      <p>Cargo: ${Pessoa?.cargo}</p>
                      <p>Salário: ${Pessoa?.salario}</p>
                      <p>Data De Contratação: ${Pessoa?.dataContratacao}</p>
                  </div>
            `;
      
            var text2Div = document.getElementById('text2');
            text2Div.appendChild(newCard);
        }
        console.log(data);
      })
      .catch(error => console.error('Erro:', error));
  }
  
    fetchAndCreateCard();