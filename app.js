const search = document.querySelector("#search")
let searchValue = null

const sugerenciasPokemons = document.querySelector("#pokemons")

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

const showPokemon = () => {
    console.log(singlePokemon)
    // Aqui hay que añadir para que pinte en el html la carta de un pokemon
}

const showPokemons = () => {
    console.log(pokemonMatches)
    const pokemonsHTML = pokemonMatches.map((pokemon) => `<li>${pokemon.name}</li>`).join('')
    sugerenciasPokemons.innerHTML = pokemonsHTML

}

searchPokemons()

