

const root = document.getElementById('root');
const loader = document.getElementById('contenedor');

//el paginador

const paginaActual = document.getElementById('pagina-actual')
const totalPaginas = document.getElementById('total-paginas')
const nextPage = document.getElementById('next-page')
const firstPage = document.getElementById('first-page')
const previusPage = document.getElementById('previus-page')
const lastPage = document.getElementById('last-page')



let pagina = 1;

const getData = async () => {
  const url = 'https://protected-taiga-89091.herokuapp.com/api/card?=$(pagina)'
  const response = await fetch(url)
  const json = await response.json();
  paginaActual.innerHTML = pagina
  totalPaginas.innerHTML = json.totalCount
  printData(json.data)
  setTimeout(()=> {
    root.classList.remove('esconder')
    loader.classList.add('esconder')
  },700)
  data = json; 
  return json;
  
}

let data = {};

console.log(data)



const printData = arr =>{
  let card = '';
  arr.forEach((carta) => {
    console.log(carta)
    card = card +  `
    <div class="col s15 m6 13">
            <div class="card">
              <div class="card-image">
                <img src=${carta.clowCard}>
                </div>
                  <div class="card-large">
      
                    <div class="card-content">
                     <p>Número de Carta: ${carta.cardNumber}</p>
                     <p>Nombre en Español: ${carta.spanishName}</p>
                     <p>Nombre en Ingles: ${carta.englishName}</p>
                     <p>kanji: ${carta.kanji}</p>
                     <p>Rōmaji: ${carta.Rōmaji}</p>
                     <p>Aparicion en Manga: ${carta.appeardManga}</p>
                     <p>Aparicion en Anime: ${carta.appeardAnime}</p>
                     <p><a href=${carta.sakuraCard}">"sakuraCard"</a></p>
                     <p>Significado:${carta.meaning}</p>
                    </div>
                  </div>
                <div class="card-action"></div>
                <a href="a">Ver más</a>
            </div>
          </div>
        </div>`
 
})
 root.innerHTML = card;
}

const pagination = async promesa => {
  const result = await promesa
  nextPage.addEventListener('click', () =>{
    pagina += 1;
    getData()
  })
 previusPage.addEventListener('click', () =>{
    pagina -= 1;
    getData()
  })
  lastPage.addEventListener('click',() => {
    if(pagina < result.totalCount)
      pagina = result.totalCount
      getData()
  })
  firstPage.addEventListener('click',() => {
    if(pagina > 2){
      pagina = 1;
      getData()
    }
  })

  const updatePagination = () => {
    if(pagina <= 1){
      previusPage.disabled = true;
      firstPage.disabled = true;
    } else{
      previusPage.disabled = false;
      firstPage.disabled = false;
    }
  }
  
}

pagination(getData())