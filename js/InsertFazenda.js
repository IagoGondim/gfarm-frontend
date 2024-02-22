function fetchAndCreateCard() {
    var token = localStorage.getItem('token');
            console.log(token);
            fetch('http://localhost:8080/usuario/fazendas', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            })
      .then(response => {return response.json();})
      .then(data => {
        console.log(data[0])
        // Criar um novo elemento de card
        var newCard = document.createElement('div');
        newCard.classList.add('card');
  
        // Preencher o conteúdo do card com os dados recebidos
        newCard.innerHTML = `
        <img src="../img/BannerFazenda.jpg" alt="ImagemCard">
        <div class="card-content">
            <h2>${data[0]?.nome}</h2>
            <p>Área Total da Fazenda: ${data[0]?.areaTotal} hectares</p>
            <p>Logradouro da Fazenda: ${data[0]?.endereco?.logradouro}</p>
            <p>Número da Fazenda: ${data[0]?.endereco?.numero}</p>
            <p>Bairro: ${data[0]?.endereco?.bairro}</p>
            <p>Cidade: ${data[0]?.endereco?.cidade}</p>
        </div>
        `;
  
        // Inserir o novo card dentro da div com id "text1"
        var text1Div = document.getElementById('text1');
        text1Div.innerHTML = ''; // Limpar qualquer conteúdo anterior
        text1Div.appendChild(newCard);

        let html= `
          <li><p>${data[0]?.nome}</p></li>
        `;

        var FazendaNome = document.getElementById('NomeFazenda');
        console.log(FazendaNome)
        FazendaNome.innerHTML = html; // Limpar qualquer conteúdo anterior

        let user= `
        <h3>${data[0]?.usuario?.nome}</h3>
        `;

        var UserNome = document.getElementById('userInfo');
        console.log(UserNome)
        UserNome.innerHTML = user; // Limpar qualquer conteúdo anterior

        const cityName = document.querySelector('#city_name')
        cityName.value=`${data[0]?.endereco?.cidade}`
        preSetCity()
      })
      .catch(error => console.error('Erro:', error));
  }
  
  // Chamar a função fetchAndCreateCard quando necessário (por exemplo, quando o botão "Próximo" for clicado)
    fetchAndCreateCard();


