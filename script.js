let allPokemon = [];
let loadPokemonstart = 1;
let loadPokemonstop = 21;
let resultsOfSearch = [];

async function loadPokemon() {
  showLoader(true);
  for (let i = loadPokemonstart; i < loadPokemonstop; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    let pokemons = await response.json();
    allPokemon.push(pokemons);
  }
  renderPokemon(allPokemon);
  showLoader(false);
}

async function loadmorePokemon() {
  var element = document.getElementById("profile-main-loader");
  element.style.display = null;
  loadPokemonstart = loadPokemonstop;
  loadPokemonstop = loadPokemonstop + 20;
  await loadPokemon();
}

function renderPokemon(currentPokemon) {
  renderPokemon2();
}

function renderfilteredPokemon(resultsOfSearch) {
  renderfilteredPokemon2();
}

function generateID(i) {
  let pokemonID = allPokemon[i]["id"];
  let pokemonIDasString = pokemonID.toString();
  pokemonID = pokemonIDasString.padStart(3, "0");
  document.getElementById(`pokemonID${i}`).innerHTML += pokemonID;
}

function generateIDsearchedPokemons(i) {
  let pokemonID = resultsOfSearch[i]["id"];
  let pokemonIDasString = pokemonID.toString();
  pokemonID = pokemonIDasString.padStart(3, "0");
  document.getElementById(`pokemonID${i}`).innerHTML += pokemonID;
}

function generateIDDetail(i) {
  let pokemonID = allPokemon[i - 1]["id"];
  let pokemonIDasString = pokemonID.toString();
  pokemonID = pokemonIDasString.padStart(3, "0");
  document.getElementById(`pokemonIDDetail${i}`).innerHTML += pokemonID;
}

function openDetailCard(i) {
  document.getElementById("DetailCard").style.display = "block";
  document.getElementById("DetailCardWrapper").style.display = "flex";
  renderDetailCard(i);
  renderPokemonAbilities(i);
}

function closeDetailCard() {
  document.getElementById("DetailCard").style.display = "none";
  document.getElementById("DetailCardWrapper").style.display = "none";
}

function closeDetailCardOnbclickOutside(event) {
  event.stopPropagation();
}

function renderDetailCard(i) {
  renderDetailCardinside(i);
  generateIDDetail(i);
  changeBGcolorDetail(i);
  renderPokemonTypesDetailCard(i);
}

function previous(i) {
  if (i > 1) {
    i--;
  } else {
    i = allPokemon.length + 1;
    i--;
  }
  renderDetailCard(i);
  renderPokemonAbilities(i);
}

function next(i) {
  if (i < allPokemon.length) {
    i++;
  } else {
    i = 1;
  }
  renderDetailCard(i);
  renderPokemonAbilities(i);
}

function toggleToStats() {
  document.getElementById("CardAbout").style.display = "none";
  document.getElementById("CardStats").style.display = "block";
  document.getElementById("stats").style.backgroundColor =
    "rgb(98, 85, 85,0.6)";
  document.getElementById("about").style.backgroundColor =
    "rgb(98, 85, 85,0.2)";
}

function toggleToAbout() {
  document.getElementById("CardAbout").style.display = "block";
  document.getElementById("CardStats").style.display = "none";
  document.getElementById("about").style.backgroundColor =
    "rgb(98, 85, 85,0.6)";
  document.getElementById("stats").style.backgroundColor =
    "rgb(98, 85, 85,0.2)";
}

function changeBGcolor(i) {
  let BGcolor = allPokemon[i]["types"]["0"]["type"]["name"];
  document.getElementById(`pokedex-${i}`).classList.add(BGcolor);
}

function changeBGcolorDetail(i) {
  let BGcolor = allPokemon[i - 1]["types"]["0"]["type"]["name"];
  document.getElementById(`contentDetailCardTop`).classList.add(BGcolor);
}

function changeBGcolorSearch(i) {
  let BGcolor = resultsOfSearch[i]["types"]["0"]["type"]["name"];
  document.getElementById(`pokedex-${i}`).classList.add(BGcolor);
}

function renderPokemonTypes(i) {
  let pokemonTypes = document.getElementById(`pokemonTypes${i}`);
  let pokemon = allPokemon[i];

  for (let i = 0; i < pokemon["types"].length; i++) {
    const element = pokemon["types"][i];
    let type = pokemon["types"][i]["type"]["name"];
    pokemonTypes.innerHTML += `<p>${type}</p>`;
  }
}

function renderPokemonTypesDetailCard(i) {
  let pokemonTypes = document.getElementById(`pokemonTypesDetailCard-${i}`);
  let pokemon = allPokemon[i - 1];

  for (let i = 0; i < pokemon["types"].length; i++) {
    const element = pokemon["types"][i];
    let type = pokemon["types"][i]["type"]["name"];
    pokemonTypes.innerHTML += `<p>${type}</p>`;
  }
}

function renderPokemonAbilities(i) {
  let PokemonAbilities = document.getElementById(`abilities${i}`);
  let pokemon = allPokemon[i - 1];

  for (let i = 0; i < pokemon["abilities"].length; i++) {
    const element = pokemon["abilities"][i];
    let ability = pokemon["abilities"][i]["ability"]["name"];
    PokemonAbilities.innerHTML += `<div class="uppercase ml4">${ability}</div>`;
  }
}

function searchPokemon() {
  let searchedInput = document.getElementById("searchforPokemon").value;
  searchedInput = searchedInput.toLowerCase();
  let pokemonCard = document.getElementById("pokemonCard");
  pokemonCard.innerHTML = "";
  resultsOfSearch = [];

  for (let i = 0; i < allPokemon.length; i++) {
    let searchedPokemon = allPokemon[i]["name"];
    if (searchedPokemon.toLowerCase().includes(searchedInput)) {
      let searchResult = allPokemon[i];
      resultsOfSearch.push(searchResult);
    }
  }
  renderfilteredPokemon(resultsOfSearch);
}

function clearSearch() {
  let searchedInput = document.getElementById("searchforPokemon");
  searchedInput.value = "";
  searchPokemon();
}

function renderDetailCardinside(i) {
  let pokemonName = allPokemon[i - 1]["name"];
  let pokemonID = allPokemon[i - 1]["id"];
  let pokemonImage =
    allPokemon[i - 1]["sprites"]["other"]["official-artwork"]["front_default"];
  let pokemonHeight = allPokemon[i - 1]["height"];
  let pokemonWeight = allPokemon[i - 1]["weight"];
  let PokemonStatHP = allPokemon[i - 1]["stats"]["0"]["base_stat"];
  let PokemonStatAttack = allPokemon[i - 1]["stats"]["1"]["base_stat"];
  let PokemonStatDefense = allPokemon[i - 1]["stats"]["2"]["base_stat"];
  let PokemonStatSpecialAttack = allPokemon[i - 1]["stats"]["3"]["base_stat"];
  let PokemonStatSpecialDefense = allPokemon[i - 1]["stats"]["4"]["base_stat"];
  let PokemonStatSpeed = allPokemon[i - 1]["stats"]["5"]["base_stat"];

  DetailCard.innerHTML = "";
  renderDetailCardinside2(
    i,
    pokemonName,
    pokemonID,
    pokemonImage,
    pokemonHeight,
    pokemonWeight,
    PokemonStatHP,
    PokemonStatAttack,
    PokemonStatDefense,
    PokemonStatSpecialAttack,
    PokemonStatSpecialDefense,
    PokemonStatSpeed
  );
}

function showLoader(show) {
  const loader = document.getElementsByClassName("profile-main-loader")[0];
  if (show) {
    loader.style.display = "block";
  } else {
    loader.style.display = "none";
  }
}
