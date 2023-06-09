const container: HTMLElement | any = document.getElementById("app")
const pokemons: number = 100

interface IPokemon {
    id: number;
    name: string;
    image: string;
    type: string;
}

const fetchData = (): void => {
    for (let i = 1; i <= pokemons; i++) {
        getPokemon(i)
    }
}

const getPokemon = async (id: number): Promise<void> => {
    // using an async function that returns a Promise of type void
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon: any = await data.json()
    const pokemonType: string = pokemon.types
        .map((poke: any) => poke.type.name)
        .join(", ")

    const transformedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
    }

    showPokemon(transformedPokemon)
}

const showPokemon = (pokemon: IPokemon): void => {
    // this function receives as a parameter the pokemon object of type IPokemon and returns void
    // or no value to be precise
    let output: string = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `
    container.innerHTML += output
    // appends this content to the HTML file with the container id as defined as line 1
}

fetchData()
