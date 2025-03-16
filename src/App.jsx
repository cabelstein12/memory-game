import { useEffect, useState } from 'react';
import './App.css';
import './Cards.css';
import './style.css';
import './api'
import getPokemon from './api';


function App() {

  function Scoreboard(){
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    return (
      <div id='scoreboard'>
        <h4>Memory Game</h4>
        <div id='current-score'>Current Score: {score}</div>
        <div id='high-score'>High Score: {highScore}</div>
      </div> 
    )
  }

  function Cards(){

    return(
      <div id='card-group'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    )
  }
  function Card(){
    const [pokemon, setPokemon] = useState(
      {
        name: 'Blastoise', 
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      });
    useEffect(()=>{
      getPokemon().then(pokemon => setPokemon(pokemon));
    }, [])
    return(
    <div className='card'>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
    )
  }

  return (
    <>
      <Scoreboard />
      <Cards />
    </>
  )
}

export default App
