const container = document.querySelector('#container');
const formSearch = document.querySelector('#form-search');
const loader = document.querySelector("#loader-indicator");
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

const getEpisode = async (url) => {
  if (!url) {
    return 'No episodes avaible';
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
  } catch (error) {
    throw new Error(error);

  }
};

const searchCharacterByName = async (characterName) => {

  try {
    loader.style.display = "block";
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
    if(response.status === 404) {
      throw new Error('Character not found');
    }
    const data = await response.json();
    console.log(data.results);
    container.appendChild(generationRow(data.results));
    loader.style.display = "none";
  } catch (error) {
    container.innerHTML = `<h1 class="mt-5 text-center">Character not found</h1>`
    loader.style.display = "none";
  }
  // console.log(characterName);
}

const generationRow = (characters) => {
  
  const row = document.createElement("div");
  // const row = <div></div>
  row.className = "row d-flex justify-content-around"; //* agregamos la clase row al div
  // <div class="row d-flex justify-content-around"> </div>
  row.innerHTML = ``;
  characters.map( async character => {
    // console.log(character);
    const lastEpisodeUrl = character.episode[character.episode.length - 1];
    const lastEpisodeName = await getEpisode(lastEpisodeUrl);
    row.innerHTML = row.innerHTML + generateCardBootstrap(character, lastEpisodeName);
  })
  console.log(row);
  return row;
};

const generateCardBootstrap = (character, lastEpisodeName) => {
  const statusColor = character.status.toLowerCase() === 'alive' ? 'green': character.status.toLowerCase() === 'unknown'? 'gray': 'red';

  return `
    <div class="card col-lg-12 col-xl-6 d-flex mt-5" style="max-width: 38rem;">
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
        
          <p class="card-text location" style="margin-bottom: 0;">
            Last known location:
          </p>

          <p class="card-text">
          ${character.location.name}
          </p>
          
          <p class="card-text location" style="margin-bottom: 0;">
            Last episode:
          </p>
           <p class="card-text">
            ${lastEpisodeName}
          </p>
          
        </div>
      </div> 
      </div>
      
    </div>
  `;
};

//* FORMULARIO
formSearch.addEventListener('submit', function(event) {
  event.preventDefault();
  const characterSearch = document.querySelector('#search-character').value;
  container.innerHTML = '';
  searchCharacterByName(characterSearch);
})


getCharacters();



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
