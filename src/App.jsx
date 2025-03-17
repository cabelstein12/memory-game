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
      const generateArray = (arr = []) => {
        let value = Math.floor(Math.random() * 19);
        if(arr.includes(value)){return generateArray(arr)}
        else if(arr.length == 8){return arr}
        else{arr.push(value); return generateArray(arr)};
      }
      const [numberList] = useState(generateArray());
    return(
      <div id='card-group'>
        <Card number={numberList[0]}/>
        <Card number={numberList[1]}/>
        <Card number={numberList[2]}/>
        <Card number={numberList[3]}/>
        <Card number={numberList[4]}/>
        <Card number={numberList[5]}/>
        <Card number={numberList[6]}/>
        <Card number={numberList[7]}/>

      </div>
    )
  }
  function Card({number}){
    const [pokemon, setPokemon] = useState(
      {
        name: 'Blastoise', 
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      }); 
    useEffect(()=>{
      getPokemon(number).then(pokemon => setPokemon(pokemon));
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
