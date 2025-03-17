import { useEffect, useState } from 'react';
import './App.css';
import './Cards.css';
import './style.css';
import './api'
import getPokemon from './api';


function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  function Scoreboard({score, highScore}){
    
    return (
      <div id='scoreboard'>
        <h4>Memory Game</h4>
        <div id='current-score'>Current Score: {score}</div>
        <div id='high-score'>High Score: {highScore}</div>
      </div> 
    )
  }

  function Cards({score, highScore, handleSetScore, handleSetHighScore}){
      const generateArray = (arr = []) => {
        let value = Math.floor(Math.random() * 19);
        if(arr.includes(value)){return generateArray(arr)}
        else if(arr.length == 8){return arr}
        else{arr.push(value); return generateArray(arr)};
      }
      const [numberList, setNumberList] = useState(generateArray());
      const [memory, setMemory] = useState([]);
      function handleSetMemory(poke){
        console.log(memory, poke.name)
        setMemory([
          ...memory,
          {id: poke.name, name: poke.name}
        ]);
      }
      function addPokemonToMemory(poke){
        console.log(poke)
        if(memory.includes(poke)){
          console.log('failed')
          handleSetHighScore(highScore);
          setMemory([]);
        }else{
          console.log('added to mem', memory)
          handleSetScore(score + 1)
          handleSetHighScore(highScore + 1)
          //handleSetMemory(poke); //  NOT WORKING HERE; IF PASSED DIRECTLY TO CARD IT WORKS THOUGH ...
          setNumberList(generateArray())
        }
      }
    return(
      <div id='card-group'>
        <Card number={numberList[0]} handleClick={handleSetMemory}/> 
        <Card number={numberList[1]} handleClick={handleSetMemory}/>
        <Card number={numberList[2]} handleClick={handleSetMemory}/>
        <Card number={numberList[3]} handleClick={handleSetMemory}/>
        <Card number={numberList[4]} handleClick={handleSetMemory}/>
        <Card number={numberList[5]} handleClick={handleSetMemory}/>
        <Card number={numberList[6]} handleClick={handleSetMemory}/>
        <Card number={numberList[7]} handleClick={handleSetMemory}/>

      </div>
    )
  }
  function Card({number, handleClick, memory}){
    const [pokemon, setPokemon] = useState(
      {
        name: 'Blastoise', 
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      }); 
    useEffect(()=>{
      getPokemon(number).then(pokemon => setPokemon(pokemon));
    }, [memory])
    return(
    <div className='card' onClick={()=>handleClick(pokemon)}>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
    )
  }

  return (
    <>
      <Scoreboard score={score} highScore={highScore}/>
      <Cards score={score} highScore={highScore} handleSetScore={setScore} handleSetHighScore={setHighScore}/>
    </>
  )
}

export default App
