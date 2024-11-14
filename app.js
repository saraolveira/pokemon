const search = document.querySelector("#search")
let searchValue = null

let singlePokemon = null

const getPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1126")

    return response.json()
}

const matchPokemons = async () => {
    const data = await getPokemons()
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
