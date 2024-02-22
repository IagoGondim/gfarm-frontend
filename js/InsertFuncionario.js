function fetchAndCreateCard() {
    var token = localStorage.getItem('token');
            console.log(token);
            fetch('http://localhost:8080/usuario/funcionarios', {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer' + token
              },
            })
      .then(response => {return response.json();})
      .then(data => {
        for (let Pessoa of data){
            console.log(Pessoa);
            var newCard = document.createElement('div');
            newCard.classList.add('card');
      
            // Preencher o conteúdo do card com os dados recebidos
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
      
            // Inserir o novo card dentro da div com id "text2"
            var text2Div = document.getElementById('text2');
            text2Div.appendChild(newCard);
        }
        console.log(data);
        // Criar um novo elemento de card
      })
      .catch(error => console.error('Erro:', error));
  }
  
  // Chamar a função fetchAndCreateCard quando necessário (por exemplo, quando o botão "Próximo" for clicado)
    fetchAndCreateCard();