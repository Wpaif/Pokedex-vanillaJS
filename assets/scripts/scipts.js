const TOSEEUNTIL = 151 // MAX: 898 (8°GEN) 



document.addEventListener('DOMContentLoaded', () => {

    const pokemonPromises = createPokemonPromises()

    Promise.all(pokemonPromises)
        .then(generateHTML)
        .then(insertPokemonsIntoPages)


})


const getPokemonUrl = (id) => {
    return `https://pokeapi.co/api/v2/pokemon/${id}`
}


const createPokemonPromises = () => Array(TOSEEUNTIL).fill().map((_, index) => {
    return fetch(getPokemonUrl(index + 1)).then(response => response.json())
})


const generateHTML = pokemons => pokemons.reduce((acumulator, { name, id, types }) => {

    const elementType = types.map((typeInfo) => typeInfo.type.name)
    acumulator +=
        `<li class="card ${elementType[0]} border-${elementType[1]}">
        <img class = "card-image" alt = "${name}" src = "https://pokeres.bastionbot.org/images/pokemon/${id}.png">

        <h2 class = "card-tittle">${id}. ${name}</h2>

        <p class="card-subititle">${elementType.join(' | ')}</p>

        </li>`
    return acumulator
}, '')


const insertPokemonsIntoPages = pokemons => {
    const ul = document.querySelector('[data-js = "pokedex"]')
    ul.innerHTML = pokemons
}