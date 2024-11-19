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
    pokemonCard.innerHTML = `<div class="pokemon-superior"><h2 class="pokemon-name">
    ${pokemonData.name}</h2> <div class="type-icon" >
            <svg viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="m342.198.501279c.373-.5317158 1.105-.660937 1.637-.288625l36.354 25.455546c.532.3723.661 1.1051.289 1.6368l-50.599 72.2623c24.599 7.8587 41.358 16.3357 41.358 16.3357s-40.964 70.462-110.443 70.462-118.85-65.672-118.85-65.672 17.506-11.172 43.456-20.7539l-55.5-66.1415c-.417-.4973-.352-1.2386.145-1.6558l33.997-28.52715c.498-.41723 1.239-.35238 1.656.14487l70.272 83.74688c6.017-.6806 12.147-1.061 18.333-1.061 8.891 0 17.771.6759 26.44 1.8229zm13.746 189.200721c18.541-13.242 46.597-47.804 46.597-47.804s71.664 56.79 71.664 177.206c0 120.415-123.896 192.888-123.896 192.888s-59.195-59.781-73.727-135.562c-14.531-75.781 21.496-159.927 21.496-159.927s39.324-13.559 57.866-26.801zm-199.683 0c-18.541-13.242-46.597-47.804-46.597-47.804s-71.664 56.79-71.664 177.206c0 120.415 123.896 192.888 123.896 192.888s59.195-59.781 73.727-135.562c14.531-75.781-21.496-159.927-21.496-159.927s-39.324-13.559-57.866-26.801z" /></svg>
            </div></div>
    <div class="pokemon-imgs">

            <img src="${frontIMG}" alt="${pokemonData.name}" class="imagen-frontal"/>
            <img src="${pokemonData.sprites.back_default}" alt="${
        pokemonData.name
    } " class="imagen-trasera" />
    </div>
<div class="pokemon-column">
  
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
                <div class="pokemon-data">
            <p class="altura">Height: ${pokemonData.height} </p>
            <p class="ancho">Weight: ${pokemonData.weight} </p>
         </div>
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

// Parte de atras de la tarjeta

pokemonCard.addEventListener("click", () => {
    pokemonCard.innerHTML = `
    <div id="back-card">
    <img src="./img/logo/pokelogo.png" class="card-text"/>
    <img src="./img/pokeball.png" class="card-pokeball"/></div>`

    if (back) {
        showPokemon()
    }
    back = true
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
