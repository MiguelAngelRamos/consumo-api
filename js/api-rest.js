const getCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  console.log(data.info);
  console.log(data.results);
};


getCharacters();