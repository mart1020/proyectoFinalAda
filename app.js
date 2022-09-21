const root = document.getElementById('root')

const loader = document.getElementById('contenedor')

const totalCartas = document.getElementById('total-cartas');

//-----------------------------------------------------
//PAGINADOR
//-----------------------------------------------------

const paginaActual= document.getElementById('pagina-actual')
const totalPaginas = document.getElementById('total-paginas')
const nextPage = document.getElementById('next-page')
const firstPage = document.getElementById('first-page')
const previusPage = document.getElementById('previus-page')
const lastPage = document.getElementById('last-page')

//------------------------------------------------------
//FILTROS
//------------------------------------------------------

const todos = document.getElementById('todos')
const primeraAparicion = document.getElementById('primeraAparicion')
const segundaAparicion = document.getElementById('segundaAparicion')


let pagina = 1;
let total = 0;

const getData = async () => {
    const url = `https://protected-taiga-89091.herokuapp.com/api/card?pageSize=10&page=${pagina}`
    const response = await fetch(url)
    const json = await response.json();
    paginaActual.innerHTML = json.page
    total = json.pageSize;
    totalPaginas.innerHTML = total
    
    printData(json.data) 
    setTimeout(() => {
        root.classList.remove('esconder')
        loader.classList.add('esconder')
    },1000)
    updatePagination()
    data = json;
    return json;
    

}


let data = {}

//----------------------------------------------------------
//TARJETAS
//----------------------------------------------------------

const printData = arr => {
    let card = '';
    totalCartas.innerHTML = arr.length
    arr.forEach((carta) => {
        //console.log(carta)
        card = card +
        `<div class="col s10 m6 l2">
                <div class="card">
                    <div class="card-image">
                        <img src=${carta.clowCard}>
                        
                    </div>
                    <div class="card-content">
                        <p>Número de Carta: ${carta.cardNumber} </p>
                        <p>Nombre en Español: ${carta.spanishName}</p>
                        <p>Nombre en Ingles: ${carta.englishName}</p>
                        <p>Kanji: ${carta.kanji}</p>
                        <p>Rōmaji: ${carta.Rōmaji}</p>
                        <p>Aparicion en Manga: ${carta.appeardManga}</p>
                        <p>Aparicion en Anime: ${carta.appeardAnime}</p>
                        <p>Significado: ${carta.meaning}</p>
                    </div>
                    <div class="card-action">
                        <a href="#">Ver mas</a>
                    </div>
                </div>
         </div>`
    })
    root.innerHTML = card;
}

//-----------------------------------------------------------
//PAGINACION
//-----------------------------------------------------------

const pagination = async promesa => {
    const result = await promesa
    nextPage.addEventListener('click', () => {
        pagina += 1;
        getData()
    })

    previusPage.addEventListener('click', () => {
        pagina -= 1;
        getData()
    })
    lastPage.addEventListener('click', () => {
        if(pagina < result.pageSize){
            pagina = result.pageSize
            getData()
        }
    })
    firstPage.addEventListener('click', () => {
        if(pagina > 2){
            pagina = 1;
            getData()
        }
    })
}

const updatePagination = () => {
    if(pagina <= 1){
        previusPage.disabled = true;
        firstPage.disabled = true;
    } else {
        previusPage.disabled = false;
        firstPage.disabled = false;
    }
    if(pagina == total ){
        nextPage.disabled = true;
        lastPage.disabled = true;
    }else {
        nextPage.disabled = false;
        lastPage.disabled = false;
    }
}
//------------------------------------------------
//FOLTROS
//------------------------------------------------

todos.addEventListener('click', () => {
    const arr = data.data;
    printData(arr)
})

primeraAparicion.addEventListener('click', () => {
    const arr = data.data;
    let arrCartaUno = [];
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].cardNumber <= '8'){
            arrCartaUno.push(arr[i])
        }    
    }
    printData(arrCartaUno)
})

segundaAparicion.addEventListener('click', () => {
    const arr = data.data;
    let arrCartaDos = [];
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].cardNumber >= '8'){
            arrCartaDos.push(arr[i])
        }    
    }
    printData(arrCartaDos)
})




pagination (getData())
