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
        if (data[0]?.id){
          localStorage.setItem("fazendaId", data[0]?.id)
        }
        var newCard = document.createElement('div');
        newCard.classList.add('card');
  
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
  
        var text1Div = document.getElementById('text1');
        text1Div.innerHTML = '';
        text1Div.appendChild(newCard);

        let html= `
          <li><p>${data[0]?.nome}</p></li>
        `;

        var FazendaNome = document.getElementById('NomeFazenda');
        console.log(FazendaNome)
        FazendaNome.innerHTML = html;

        let user= `
        <h3>${data[0]?.usuario?.nome}</h3>
        `;

        var UserNome = document.getElementById('userInfo');
        console.log(UserNome)
        UserNome.innerHTML = user;

        const cityName = document.querySelector('#city_name')
        cityName.value=`${data[0]?.endereco?.cidade}`
        preSetCity()
      })
      .catch(error => console.error('Erro:', error));
  }
  
    fetchAndCreateCard();


