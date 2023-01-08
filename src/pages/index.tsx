import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { isEnglish , generateRule} from "../util/util";
import {Howl} from 'howler';
import styled, {keyframes} from "styled-components";

const press = new Howl({
  src: ['/sounds/switch21.wav']
});

const correct = new Howl({
  src: ['/sounds/correct.mp3']
});

const incorrect = new Howl({
  src: ['/sounds/incorrect.mp3']
});

const pulse  = keyframes`
  0% {
    scale: 1;
  }
  90% {
    scale: 1.15
  }
  100% {
    scale: 1;
  }
`

const Heart = (props: {health: number}) =>{

  return <div className="flex gap-1">
    <img src="heart.svg" width={'24px'}  style={{filter: props.health< 1 ? "grayscale(100%)" : ""}}/>
    <img src="heart.svg" width={'24px'} style={{filter: props.health< 2 ? "grayscale(100%)" : ""}}/>
    
    <img src="heart.svg" width={'24px'} style={{filter: props.health< 3 ? "grayscale(100%)" : ""}} />
    
    
  </div>
}


const Home: NextPage = () => {

  const [guess, setGuess] = useState("");
  const [rule, setRule] = useState("");
  const [health, setHealth] = useState(3);
  const [points, setPoints] =useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  async function handleGuess(e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if(e.key == "Enter" && !gameOver){
      if(guess.toLowerCase().includes(rule.toLowerCase()) && await isEnglish(guess)){
        correct.play()
        setPoints(points+1);
        setGuess("");
        setTimeLeft(5);
        setRule(generateRule());

      }else{
        incorrect.play();
        setHealth(health-1);
        if(health==1){
          setGameOver(true);
        }else{

        }
      }
    }
    
  }

  function handleStartGame(){
    setGameStart(true);
    setGuess("");
    setRule(generateRule());
  }
  function handleRestart(){
    
    setGameOver(false);
    setTimeLeft(5);
    setPoints(0);
    setHealth(3);
    setGuess("");
    setGameStart(true);
    setRule(generateRule());
  }
  function gameTick(){
    
    if (gameStart && !gameOver){
      if(timeLeft == 0 ){
        setGameOver(true)
      }else{
        setTimeLeft(t=>t-1);
        
      }
    }
    
  }

  useEffect(()=>{
      const interval = setInterval(()=>gameTick(), 1000)
      //const tickInterval = setInterval(()=>press.play(), 300)
      //clearInterval(tickInterval); 
      return () => {clearInterval(interval)}; 
    }
    , [gameStart, gameOver, timeLeft]);


  async function globalKeyPress(e: any){
    const charCode = e.keyCode;

            
    if(e.key == 'Enter'){
      if(!gameOver){
        if(guess.toLowerCase().includes(rule.toLowerCase()) && await isEnglish(guess)){
          correct.play()
          setPoints(points+1);
          setGuess("");
          setTimeLeft(5);
          setRule(generateRule());
  
        }else{
          incorrect.play();
          setHealth(health-1);
          if(health==1){
            setGameOver(true);
          }else{
  
          }
        }
      }
    }else if(e.key =='Backspace'){
      setGuess(t=>t.slice(0, -1))
    }else if((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8){
      press.rate(1+guess.length/10);
      press.play();
      setGuess(t=>t+e.key); handleGuess(e)
    }
  }

  useEffect(()=>{
    window!.addEventListener("keydown", globalKeyPress);
    return ()=>{window!.removeEventListener("keydown", globalKeyPress)};
  })



  return (
    <>
      <Head>
        <title>Text Typhoon</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/bomb.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#222222] text-white">
        
        
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-3xl">
          {gameOver && <><div className="text-red-500">Game Over</div><div>Final Score: {points}</div></>}
          {gameStart && !gameOver && <><div>Type an english word containing: {rule}</div><div>Time left: {timeLeft}</div> </>}
        </div>
        <div className=" m-x-auto mb-12" >
        <Img style={{animationPlayState: (gameStart && !gameOver)   ? "running" : "paused"}} src="bomb.svg" width={"128px"}></Img>
        </div>
      
        <div style={{minHeight: "24px"}} className="flex gap-1" >
        {[...guess].map((element, key) => <div key={key} className="bg-gray-400 w-5 uppercase text-center text-gray-800">{element}</div>)}
        </div>
        <div className="flex  justify-between  w-96 mt-2">
        {gameStart && <><div>Health: <Heart health={health}/></div><div> Points: {points}</div></>}
        </div>
        {!gameStart && <div><button onClick={handleStartGame} className="text-5xl">Click to Start</button></div>}
        
        <div style={{height: "3rem"}}className="mt-5">
        {gameOver && <div><button onClick={handleRestart} className="text-5xl">Restart</button></div>}
        </div>
      </main>
      
    </>
  );
};


const Input = styled.input`
  border-radius: 3px;
  border: solid;
  border-color: blue;
`
const Img = styled.img`
transform-origin: center;

animation: ${pulse} 0.3s infinite;
`


export default Home;