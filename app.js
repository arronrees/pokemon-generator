const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonImg = document.querySelector('.pokemonImg img');
const number = document.querySelector('.number');
const name = document.querySelector('.name');
const abilities = document.querySelector('.abilities');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const randomBtn = document.querySelector('.random');

const loadBtn = document.querySelector('.loading');
const pageCard = document.querySelector('.pageCard');

let current = 1;

// Wrapper function for on load event
function init() {
  loadBtn.addEventListener('click', () => {
    loadDone();
    generatePokemon();
  });

  function loadDone() {
    loadBtn.classList.add('loadDone');
    pageCard.classList.add('loadDone');
  }

  // Get json for pokemon
  async function getPokemonData() {
    const res = await fetch(`${baseURL}${current}`);
    return await res.json();
  }

  // Generates pokemon html details
  function generatePokemon() {
    getPokemonData().then((data) => {
      pokemonImg.src = data.sprites.other.dream_world.front_default;
      pokemonImg.alt = data.name;
      number.innerHTML = `<h2>${data.id}</h2>`;
      name.innerHTML = `<h1>${data.name}</h1>`;
      abilities.innerHTML = `<div>${data.abilities[0].ability.name}</div>
                          <div>${data.abilities[1].ability.name}</div>`;
    });
  }

  // Button functions to cycle through pokemon
  function nextPokemon() {
    if (current === 150) {
      current = 1;
    } else {
      current++;
    }
    generatePokemon();
  }

  function prevPokemon() {
    if (current === 1) {
      current = 150;
    } else {
      current--;
    }
    generatePokemon();
  }

  function randomPokemon() {
    if (current >= 150) {
      return;
    } else {
      current = Math.floor(Math.random() * 149) + 1;
    }
    generatePokemon();
  }

  nextBtn.addEventListener('click', nextPokemon);
  prevBtn.addEventListener('click', prevPokemon);
  randomBtn.addEventListener('click', randomPokemon);
}

window.addEventListener('load', init);
