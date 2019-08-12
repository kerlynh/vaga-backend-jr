const container = document.querySelector('#items-clubes');
const containerClass = document.querySelector('#item-class');
fetch('http://localhost:3000/clubes')
  .then((response) =>{
    return response.json();
  })
  .then((camps) =>{
    camps.forEach(time => {
    //---------- criando tabela ----------
    //---------- linha ----------
        const linha = document.createElement('tr');
    //---------- coluna ----------
        const colunaTime = document.createElement('td');
          colunaTime.innerHTML = time.nome;
          linha.appendChild(colunaTime);

        const colunaImgTime = document.createElement('td');
          const imgTime = document.createElement('img');
          imgTime.setAttribute('src', time.imagem);
          imgTime.setAttribute('class', 'img-time')
          colunaImgTime.appendChild(imgTime);
        linha.appendChild(colunaImgTime);

    //---------- chamando a tabela ----------
        const tabela = document.querySelector('.camp-body');
        tabela.appendChild(linha);

     
    //---------- botao remover para cada time ----------        
        const btnDel = document.createElement('button');
          btnDel.textContent = 'Remover'
          btnDel.setAttribute('class', 'btn btn-info');
          btnDel.setAttribute('data-id', time._id);
          btnDel.style.height = '30px';
        linha.appendChild(btnDel);

        btnDel.addEventListener('click', () =>{
          fetch(
            `http://localhost:3000/clubes/${time._id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          ).then((response) => {
            console.log(response)
            if(response.status === 204) {
              window.location.reload()
            } else {
              window.alert('Não foi possível deletar!')
            }
          })
        })

      //---------- Tabela Classificacao ----------
      //---------- linha ----------
        const linhaClass = document.createElement('tr');

      //---------- coluna ----------
        const colunaClass = document.createElement('td');
          colunaClass.innerHTML = time.nome;
          linhaClass.appendChild(colunaClass);

        const colunaPontos = document.createElement('td');
          colunaPontos.innerHTML = time.pontos;
          linhaClass.appendChild(colunaPontos);

        const colunaVit = document.createElement('td');
          colunaVit.innerHTML = time.vitorias;
          linhaClass.appendChild(colunaVit);

        const colunaSaldoGols = document.createElement('td');
          colunaSaldoGols.innerHTML = time.saldogols;
          linhaClass.appendChild(colunaSaldoGols);

        const colunaGolsFeitos = document.createElement('td');
          colunaGolsFeitos.innerHTML = time.golsfeitos;
          linhaClass.appendChild(colunaGolsFeitos);

        const colunaEmpate = document.createElement('td');
          colunaEmpate.innerHTML = time.empate;
          linhaClass.appendChild(colunaEmpate);

        const tabClass = document.querySelector('.class-body');
        tabClass.appendChild(linhaClass);


        

    })
  })
  .catch((erro)=>{
    console.log(erro)
  })

    //---------- Incluir times ----------        
const botao = document.querySelector('#bt_new_clube')
botao.addEventListener('click', criarCamp)

function criarCamp () {
  const nome = document.querySelector('#nome-input').value
  const imagem = document.querySelector('#imagem-input').value

  const camp = {
    nome, imagem
  }

  fetch(
    'http://localhost:3000/clubes',
    {
      method: 'POST',
      body: JSON.stringify(camp),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => console.log('criou!'))
  location.reload(true)
}