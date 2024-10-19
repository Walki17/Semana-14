const botonBuscar = document.getElementById('btnBuscar');

botonBuscar.addEventListener('click', function(){
    const buscar = document.getElementById('inputBuscar').value.trim(); 

    const GALAXIAS = `https://images-api.nasa.gov/search?q=` + buscar;


fetch(GALAXIAS)
    .then(response => response.json())
    .then(data=> {
        
        const losItems = data.collection.items;
        
        const resultados = losItems.filter(item=> {
             const tituloItem = item.data[0].title || '';
             const descripcionItem = item.data[0].description || '';
             const keywordItem = item.data[0].keywords ? item.data[0].keywords.join(' ') : '';

             return tituloItem.toLowerCase().includes(buscar.toLowerCase()) || 
                    descripcionItem.toLowerCase().includes(buscar.toLowerCase()) ||
                     keywordItem.toLowerCase().includes(buscar.toLowerCase());
        });

        document.getElementById('contenedor').innerHTML = '';

        resultados.forEach(resultado => {
            const titulo = resultado.data[0].title;
            const descripcion = resultado.data[0].description || '';
            const date = resultado.data[0].date_created || '';
            const imagen = resultado.links ? resultado.links[0].href: 'vacio'

            const Info = document.createElement('div');
            Info.classList.add('col-md-4');
            Info.innerHTML = `<div id="tarjetas" class="card" style="width: 18rem;"> 
  <img src="${imagen}" class="card-img-top" alt="${titulo}">
  <div class="card-body" style="display: flex; flex-direction: column;">
    <h5 class="card-title">${titulo}</h5>
    <p class="card-text" style="flex-grow: 1; overflow-y: auto; overflow-x: hidden; margin-bottom: 0;">
      ${descripcion}
    </p>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Fecha: ${date}</li>
    </ul>
  </div>
</div>`

            document.getElementById('contenedor').appendChild(Info);
        });

    })

    .catch(error => {
        console.error('Error', error);
    });

    });