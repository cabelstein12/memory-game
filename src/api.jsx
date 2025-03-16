export default async function getPokemon(){
    const randomNumber = Math.floor(Math.random() * 19);

    async function assignPokemon(){
        const pokemon = {}
        await fetch("https://pokeapi.co/api/v2/pokemon/")
            .then(r => r.json())
            .then(result => pokemon.name = result.results[randomNumber].name);
        await fetch("https://pokeapi.co/api/v2/pokemon/")
            .then(r => r.json())
            .then(result => result.results[randomNumber].url)
            .then(url => fetch(url).then(r=> r.json()
            .then(data => pokemon.image = data.sprites.front_default)))
        return pokemon;
    }
    
    return assignPokemon();
}