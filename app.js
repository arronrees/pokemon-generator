// Wrapper function for on load event
function init() {
  const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

  const main = document.querySelector('main');

  // Load screen
  const loadBtn = document.querySelector('.loading');
  const pageCard = document.querySelector('.pageCard');

  // Generate html
  const container = document.createElement('div');
  container.classList.add('container');
  main.appendChild(container);

  const pokemonImgWrap = document.createElement('div');
  pokemonImgWrap.classList.add('pokemonImg');
  container.appendChild(pokemonImgWrap);

  const pokemonImg = document.createElement('img');
  pokemonImgWrap.appendChild(pokemonImg);

  const details = document.createElement('div');
  details.classList.add('details');
  container.appendChild(details);

  const number = document.createElement('div');
  number.classList.add('number');
  details.appendChild(number);

  const name = document.createElement('div');
  name.classList.add('name');
  details.appendChild(name);

  const abilities = document.createElement('div');
  abilities.classList.add('abilities');
  details.appendChild(abilities);

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  container.appendChild(buttons);

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('btn');
  prevBtn.classList.add('prev');
  prevBtn.textContent = 'Previous';
  buttons.appendChild(prevBtn);

  const randomBtn = document.createElement('button');
  randomBtn.classList.add('btn');
  randomBtn.classList.add('random');
  randomBtn.textContent = 'Random';
  buttons.appendChild(randomBtn);

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('btn');
  nextBtn.classList.add('next');
  nextBtn.textContent = 'Next';
  buttons.appendChild(nextBtn);

  // Hover and click styles to buttons
  function btnHover(e) {
    e.target.classList.add('btnClick');
  }

  nextBtn.addEventListener('mouseover', btnHover);
  prevBtn.addEventListener('mouseover', btnHover);
  randomBtn.addEventListener('mouseover', btnHover);
  loadBtn.addEventListener('mouseover', btnHover);

  function btnClick(e) {
    e.target.classList.remove('btnClick');
  }

  nextBtn.addEventListener('click', (e) => {
    nextPokemon();
    btnClick(e);
  });
  prevBtn.addEventListener('click', (e) => {
    prevPokemon();
    btnClick(e);
  });
  randomBtn.addEventListener('click', (e) => {
    randomPokemon();
    btnClick(e);
  });

  // Current pokemon
  let current = 1;

  // Load button to generate first pokemon
  loadBtn.addEventListener('click', (e) => {
    btnClick(e);
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
  async function generatePokemon() {
    const data = await getPokemonData();

    pokemonImg.src = data.sprites.other.dream_world.front_default;
    pokemonImg.alt = data.name;
    number.innerHTML = `<h2>${data.id}</h2>`;
    name.innerHTML = `<h1>${data.name}</h1>`;
    abilities.innerHTML = `<div>${data.abilities[0].ability.name}</div>
                        <div>${data.abilities[1].ability.name}</div>`;
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
}

window.addEventListener('load', init);
