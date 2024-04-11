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
  // console.log(character);
  // console.log(character.name);
  // console.log(character.image);
  return `
    <div class="col-3 card mt-5" style="width: 18rem;">
    <img src=${character.image} class="card-img-top" alt="imagen del personaje">
    <div class="card-body">
      <h5 class="card-title">${character.name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
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