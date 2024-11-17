const search = document.querySelector("#search")
let searchValue = null

const sugerenciasPokemons = document.querySelector("#pokemons")
const pokemonCard = document.querySelector("#card")

let singlePokemon = null
let pokemonMatches = null

const getPokemons = async (url) => {
    const response = await fetch(url)

    return response.json()
}

const searchPokemons = async () => {
    const data = await getPokemons(
        "https://pokeapi.co/api/v2/pokemon?limit=1126"
    )
    const pokemons = data.results

    search.addEventListener("input", () => {
        searchValue = search.value.toLowerCase()

        pokemonMatches = pokemons.filter((pokemon) => {
            const nameGuion = pokemon.name
            const name = nameGuion.replaceAll("-", " ")
            return name.includes(searchValue)
        })

        singlePokemon = pokemons.filter(
            (pokemon) => pokemon.name.replaceAll("-", " ") === searchValue
        )

        if (singlePokemon[0]) {
            showPokemon()
        } else if (pokemonMatches.length > 1) {
            showPokemons()
        }
    })
}

const showPokemon = async () => {
    // Obtener la data del pokemon
    const pokemonData = await getPokemons(singlePokemon[0].url)

    // Visibilidad de los contenedores
    sugerenciasPokemons.style.display = "none"
    pokemonCard.style.display = "block"

    // Mostrar información del pokemon en el HTML
    pokemonCard.innerHTML = `<h2 class="pokemon-name">
    ${pokemonData.name}</h2>
    <div class="pokemon-imgs">
        <img src="${
            pokemonData.sprites.other.dream_world.front_default
        }" alt="${pokemonData.name} frontal"/>
         <img src="${pokemonData.sprites.back_default}" alt="${
        pokemonData.name} posterior"/>
         <div class="pokemon-data">
            <p class="altura">Height: ${pokemonData.height} </p>
            <p class="altura">Weight: ${pokemonData.weight} </p>
         </div>
        <div class="pokemon-stats">
            <p class="health">${pokemonData.stats[0].stat.name}: ${
            pokemonData.stats[0].base_stat} </p>
            <p class="attack">${pokemonData.stats[1].stat.name}: ${
            pokemonData.stats[1].base_stat} </p>
            <p class="defense">${pokemonData.stats[2].stat.name}: ${
            pokemonData.stats[2].base_stat} </p>
            <p class="speed">${pokemonData.stats[5].stat.name}: ${
            pokemonData.stats[5].base_stat} </p>
         </div>
           <div class="pokemon-types">
           <h3>Types</h3>
           ${pokemonData.types
               .map((type) => `<p>${type.type.name}</p>`)
               .join("")}
           </div>
    </div>`
}

const showPokemons = () => {
    // Visibilidad de los contenedores
    sugerenciasPokemons.style.display = "block"
    pokemonCard.style.display = "none"

    // Mostrar los pokemons en el HTML
    const pokemonsHTML = pokemonMatches
        .map(
            (pokemon) =>
                `<li class="pokemon-name">${pokemon.name.replaceAll(
                    "-",
                    " "
                )}</li>`
        )
        .join("")
    sugerenciasPokemons.innerHTML = pokemonsHTML
}

searchPokemons()

// EventListener para los clicks en las sugerencias
sugerenciasPokemons.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        search.value = event.target.textContent;
        searchValue = search.value.toLowerCase(); // Actualizar searchValue
        singlePokemon = pokemonMatches.filter(
            (pokemon) => pokemon.name.replaceAll("-", " ") === searchValue
        );
        showPokemon();
    }
});