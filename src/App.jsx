import { Children, useState } from 'react'
import './App.css'
import './Cards.css'
import './style.css'


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
        <Card/>
        <Card/>
      </div>
    )
  }

  function Card(){
    return(
    <div className='card'>
      <img src='' alt=""  />
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
