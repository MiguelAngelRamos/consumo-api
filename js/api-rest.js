const container = document.querySelector('#container');

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
  row.className = "row"; //* agregamos la clase row al div
  // <div class="row"> </div>
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
    <div class="col-3 card mt-5" style="width: 18rem;">
    <img src=${character.image} class="card-img-top" alt="imagen del personaje">
    <div class="card-body">
      <h5 class="card-title">${character.name}</h5>
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