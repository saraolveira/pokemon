const search = document.querySelector("#search")
const iconSearch = document.querySelector("#poke-search")
let searchValue = null
let back = false

const sugerenciasPokemons = document.querySelector("#pokemons")
const noMatches = document.querySelector("#no-matches")
const pokemonCard = document.querySelector("#card")

let singlePokemon = null
let pokemonMatches = null

const getPokemons = async (url) => {
     try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`No se recibieron pokemons`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        pokemonError()
    }
}

const searchPokemons = async () => {

    const data = await getPokemons(
        "https://pokeapi.co/api/v2/pokemon?limit=1126"
    )

    let pokemons = null

    if(data) {
        pokemons = data.results
    }

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
        } else {
            noPokemons()
        }
    })
}

const showPokemon = async () => {
    // Obtener la data del pokemon
    const pokemonData = await getPokemons(singlePokemon[0].url)

    // Visibilidad de los contenedores
    sugerenciasPokemons.style.display = "none"
    pokemonCard.style.display = "flex"
    noMatches.style.display = "none"

    let frontIMG = null

    // Mostrar información del pokemon en el HTML
    if (pokemonData.sprites.other.dream_world.front_default) {
        frontIMG = pokemonData.sprites.other.dream_world.front_default
    } else {
        frontIMG = pokemonData.sprites.front_default
    }

    iconSearch.src = frontIMG
    pokemonCard.innerHTML = `<h2 class="pokemon-name">
    ${pokemonData.name}</h2>
    <div class="pokemon-imgs">
        <img src="${frontIMG}" alt="${pokemonData.name} frontal"/>
            <img src="${pokemonData.sprites.back_default}" alt="${
        pokemonData.name
    } posterior"/>
         <div class="pokemon-data">
            <p class="altura">Height: ${pokemonData.height} </p>
            <p class="altura">Weight: ${pokemonData.weight} </p>
         </div>
        <div class="pokemon-stats">
            <p class="health">${pokemonData.stats[0].stat.name}: ${
        pokemonData.stats[0].base_stat
    } </p>
            <p class="attack">${pokemonData.stats[1].stat.name}: ${
        pokemonData.stats[1].base_stat
    } </p>
            <p class="defense">${pokemonData.stats[2].stat.name}: ${
        pokemonData.stats[2].base_stat
    } </p>
            <p class="speed">${pokemonData.stats[5].stat.name}: ${
        pokemonData.stats[5].base_stat
    } </p>
         </div>
           <div class="pokemon-types">
           <h3>Types</h3>
           ${pokemonData.types
               .map((type) => `<p>${type.type.name}</p>`)
               .join("")}
           </div>
    </div>`
    back = false

    // Cambiar imagen de fondo en relación al tipo de pokemon
    switch (pokemonData.types[0].type.name) {
        case "grass":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/grass.png)"
            )
            break
        case "water":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/water.png)"
            )
            break
        case "psychic":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/psychic.png)"
            )
            break
        case "metal":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/metal_modern.png)"
            )
            break
        case "electric":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/lightning.png)"
            )
            document.documentElement.style.setProperty(
                "--color1",
                "#f2dd4a"
            )
            document.documentElement.style.setProperty(
                "--color2",
                "#f4f5cf"
            )
            break
        case "fire":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/fire_modern.png)"
            )
            break
        case "fighting":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/fighting.png)"
            )
            break
        case "dragon":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/dragon_new.png)"
            )
            break
        case "darkness":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/darkness_modern.png)"
            )
            break
        case "fairy":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/fairy.png)"
            )
            break
        case "poison":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/poison.png)"
            )
            break
        case "rock":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/rock.png)"
            )
            break
        case "ground":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/ground.png)"
            )
            break
        case "ghost":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/ghost.png)"
            )
            break
        case "flying":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/flying.png)"
            )
            break
        case "bug":
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/bug.png)"
            )
            break
        default:
            document.documentElement.style.setProperty(
                "--card-bg",
                "url(./img/texturas/colorless.png)"
            )
    }
}

const showPokemons = () => {
    // Visibilidad de los contenedores
    sugerenciasPokemons.style.display = "grid"
    pokemonCard.style.display = "none"
    noMatches.style.display = "none"

    // Mostrar los pokemons en el HTML
    const pokemonsHTML = pokemonMatches
        .map(
            (pokemon) =>
                `<li class="pokemon-name poke-match"><p>${pokemon.name.replaceAll(
                    "-",
                    " "
                )}</p></li>`
        )
        .join("")
    sugerenciasPokemons.innerHTML = pokemonsHTML
}

const noPokemons = () => {
    sugerenciasPokemons.style.display = "none"
    pokemonCard.style.display = "none"
    noMatches.style.display = "block"
    
    noMatches.innerHTML = `<p>No se ha capturado ningún pokemon. Intentálo de nuevo</p>`
}

const pokemonError = () => {
    sugerenciasPokemons.style.display = "none"
    pokemonCard.style.display = "none"
    noMatches.style.display = "block"
    
    noMatches.innerHTML = `<p>Ha ocurrido un error. Inténtalo más tarde</p>`
}

searchPokemons()

// Efectos carta pokemon
let rect = null

const followMouse = (event) => {
    const mouseX = event.clientX
    const mouseY = event.clientY
    const leftX = mouseX - rect.x
    const topY = mouseY - rect.y
    const center = {
        x: leftX - rect.width / 2,
        y: topY - rect.height / 2,
    }
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2)

    pokemonCard.style.transform = `
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 4}deg
    )
  `

    const positionX = leftX / 4
    const positionY = topY / 5


    document.documentElement.style.setProperty("--x", -event.offsetX + "px")
    document.documentElement.style.setProperty("--y", -event.offsetY + "px")

}

pokemonCard.addEventListener("mouseenter", () => {
    rect = pokemonCard.getBoundingClientRect()
    pokemonCard.addEventListener("mousemove", followMouse)
})

pokemonCard.addEventListener("mouseleave", () => {
    document.removeEventListener("mousemove", followMouse)
})

// EventListener para los clicks en las sugerencias
sugerenciasPokemons.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        search.value = event.target.textContent
        searchValue = search.value.toLowerCase() // Actualizar searchValue
        singlePokemon = pokemonMatches.filter(
            (pokemon) => pokemon.name.replaceAll("-", " ") === searchValue
        )
        showPokemon()
    }
})

pokemonCard.addEventListener("click", (event) => {
    pokemonCard.innerHTML = "<p>hola</p>"

    if (back) {
        showPokemon()
    }
    back = true
})

// Evento para funcionamiento del modo oscuro

document.querySelector("#modonoche .boton").addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro")
    document.querySelector("#background-image")
        .classList.toggle("animacion-imagen")
    document.querySelector("header").classList.toggle("modo-oscuro")
    document.getElementById("search-container").classList.toggle("modo-oscuro")
    document.querySelector("main").classList.toggle("modo-oscuro")
    document.getElementById("card").classList.toggle("modo-oscuro")
    document.querySelector("footer").classList.toggle("modo-oscuro")
    document.querySelector(".frik").classList.toggle("modo-oscuro")
})

document.querySelector("#modonoche .boton").addEventListener("dblclick", () => {
    console.log("da un susto")
    document.getElementById("susto").classList.toggle("susto")
    document.getElementById("audio-susto").play()
    // document.querySelector("body.susto").classList.toggle("susto")
})
