function fetchInsumoGrafico() {
    var token = localStorage.getItem('token');
            console.log(token);
            fetch('http://localhost:8080/usuario/insumos', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            })
      .then(response => {return response.json();})
      .then(data => {
        console.log(data);
        var tbodyInsumo = document.getElementById('graficoInsumo')
        tbodyInsumo.innerHTML = "";
        var valorMax = 0;
        for (let InsumoQuantidade of data){
            if (InsumoQuantidade.quantidadeDisponivel>valorMax){
                valorMax = InsumoQuantidade.quantidadeDisponivel
            }
        }
        for (let Insumo of data){
            console.log(Insumo);
            var newTr = document.createElement('tr');
      
            newTr.innerHTML = `
                  <th> ${Insumo?.nome} </th>
                  <td style="--size: calc( ${Insumo?.quantidadeDisponivel} / ${valorMax} ); --color: ${Insumo?.tipo=="QUIMICOS"?"#6ad7f8;":"#70d370;"};" title="Preço: R$ ${Insumo?.precoUnitario}"> ${Insumo?.quantidadeDisponivel} </td>
            `;
      
            tbodyInsumo.appendChild(newTr);
        }
        console.log(data);
      })
      .catch(error => console.error('Erro:', error));
  }
  
  fetchInsumoGrafico();