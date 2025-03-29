import { useEffect, useState } from 'react';
import './App.css';
import './Cards.css';
import './style.css';
import './api'
import getPokemon from './api';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [memory, setMemory] = useState([]);

  function handleSetHighScore(){
    if(score >= highScore){
     return setHighScore(highScore + 1);
    }
  }
  function Scoreboard({score, highScore}){
    return (
      <div id='scoreboard'>
        <h4>Memory Game</h4>
        <div id='current-score'>Current Score: {score}</div>
        <div id='high-score'>High Score: {highScore}</div>
      </div> 
    )
  }

  function Cards({score, highScore, handleSetScore, handleHighScore}){
      const generateArray = (arr = []) => {
        let value = Math.floor(Math.random() * 19);
        if(arr.includes(value)){return generateArray(arr)}
        else if(arr.length == 8){return arr}
        else{arr.push(value); return generateArray(arr)};
      }
      const [pokemonIndex, setPokemonIndex] = useState(generateArray());
      function handleSetMemory(poke){
        setMemory([
          ...memory,
          poke.name
        ]);
      }
      function updateBoard(poke){
        if(memory.includes(poke.name)){
          console.log('failed');
          handleHighScore(highScore);
          handleSetScore(0);
          setMemory([]);
        }else{
          handleSetScore(score + 1);
          handleHighScore(highScore + 1);
          handleSetMemory(poke);
          setPokemonIndex(generateArray());
        }
      }
    return(
      <div id='card-group'>
        <Card index={pokemonIndex[0]} handleClick={updateBoard}/> 
        <Card index={pokemonIndex[1]} handleClick={updateBoard}/>
        <Card index={pokemonIndex[2]} handleClick={updateBoard}/>
        <Card index={pokemonIndex[3]} handleClick={updateBoard}/>
        <Card index={pokemonIndex[4]} handleClick={updateBoard}/>
        <Card index={pokemonIndex[5]} handleClick={updateBoard}/>
        <Card index={pokemonIndex[6]} handleClick={updateBoard}/>
        <Card index={pokemonIndex[7]} handleClick={updateBoard}/>

      </div>
    )
  }
  function Card({index, handleClick}){
    const [pokemon, setPokemon] = useState(
      {
        name: 'Blastoise', 
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      }); 
    useEffect(()=>{
      getPokemon(index).then(pokemon => setPokemon(pokemon));
    }, [index])
    return(
    <div className='card' onClick={()=>handleClick(pokemon)}>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
    )
  }

  return (
    <>
      <Scoreboard score={score} highScore={highScore}/>
      <Cards score={score} highScore={highScore} handleSetScore={setScore} handleHighScore={handleSetHighScore}/>
    </>
  )
}

export default App