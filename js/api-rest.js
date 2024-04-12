const container = document.querySelector('#container');
/*const container = <div id="container" class="container mt-4">
</div>*/
const getCharacters = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
 
    container.appendChild(generationRow(data.results));
  } catch (error) {
    throw new Error(error);
  }
};

const generationRow = (characters) => {
  
  const row = document.createElement("div");
  // const row = <div></div>
  row.className = "row d-flex justify-content-around"; //* agregamos la clase row al div
  // <div class="row d-flex justify-content-around"> </div>
  row.innerHTML = ``;
  characters.map( character => {
    // console.log(character);
    row.innerHTML = row.innerHTML + generateCardBootstrap(character);
  })
  console.log(row);
  return row;
};

const generateCardBootstrap = (character) => {
  const statusColor = character.status.toLowerCase() === 'alive' ? 'green': character.status.toLowerCase() === 'unknown'? 'gray': 'red';

  return `
    <div class="card d-flex mt-5" style="max-width: 40rem;">
      <div class="row g-0">
        <div class="col-md-5">
        <img src=${character.image} class="img-fluid rounded-start" alt="imagen del personaje">
        </div>

        <div class="col-md-7">
        <div class="card-body">
          <h5 class="card-title fw-bold">${character.name}</h5>
          <p class="card-text">
            <span class="status-indicator" style="background-color:${statusColor};"></span>
            ${character.status} - ${character.species}
          </p>
        
          <p class="card-text" style="margin-bottom: 0;">
            Last known location:
          </p>

          <p class="card-text">
          ${character.location.name}
          </p>
        </div>
      </div> 
      </div>
      
    </div>
  `;
};

// const getCharacters = () => {
//   fetch("https://rickandmortyapi.com/api/character")
//   .then(function(response){
//     return response.json();
//   })
//   .then(function(dataJson) {
//     console.log(dataJson);
//   })
//   .catch(function(error) {
//     console.log(error);
//   })
// }



getCharacters();