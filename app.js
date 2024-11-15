const search = document.querySelector("#search")
let searchValue = null

let singlePokemon = null

const getPokemons = async (url) => {
    const response = await fetch(url)

    return response.json()
}

const matchPokemons = async () => {
    const data = await getPokemons(
        "https://pokeapi.co/api/v2/pokemon?limit=1126"
    )
    const pokemons = data.results
    console.log(pokemons)

    search.addEventListener("input", () => {
        searchValue = search.value.toLowerCase()

        const fullMatch = pokemons.filter(
            (pokemon) => pokemon.name === searchValue
        )
        if (fullMatch[0]) {
            singlePokemon = fullMatch[0]
        }
    })
}

matchPokemons()
