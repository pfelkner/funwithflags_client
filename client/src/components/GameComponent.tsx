import React, { useContext, useEffect, useRef, useState } from "react";
import CounterComponent from "./CounterComponent";
import FlagComponent from "./FlagComponent";
import StreakComponent from "./StreakComponent";
import GuessComponent from "./GuessComponent";
import axios from "axios";
import { getUrl } from "../hooks/getUrl";
import { getOptions, getRoundData, pickCountry, rollDifficulty } from "../hooks/gameHelpers";
import { Answers, Country, RoundData } from "../models/models";
import useUser from "../context/_UserContext";
import GameContext from "../context/GameContext";



const GameComponent = () => {
  const userContext = useUser();
  const gameContext = useContext(GameContext);
  
  const [answers, setAnswers] = useState<Answers>({ correct: 0, incorrect: 0 });
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [round, setRoundData] = useState<any |null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prevCorrect = useRef<number>(0);
  const prevIncorrect = useRef<number>(0);

const answersRef = useRef(answers);
const streakRef = useRef(streak);

useEffect(() => {
  answersRef.current = answers;
}, [answers]);

useEffect(() => {
  streakRef.current = streak;
}, [streak]);


  const fetchedData = gameContext?.currentGame;
  console.log('gameContext', fetchedData);


  const handleGameOver = () => {
    setAnswers({ correct: 0, incorrect: 0 });
  };
  // gameContext?.setCurrentGame({...gameContext.currentGame, gameOver: true});
  const processGuess = (isCorrect: boolean) => {
    setIsCorrectGuess(isCorrect);
    isCorrect ? setStreak((prev) => prev + 1) : setStreak(0);
    console.log('streak'.repeat(20));
    console.log('isCorrect', isCorrect, 'streak', streak);
    console.log('streak'.repeat(20));
    setTimeout(() => {
      isCorrect
        ? setAnswers((prev) => ({ ...prev, correct: prev.correct + 1 }))
        : setAnswers((prev) => ({
            ...prev,
            incorrect: prev.incorrect + 1,
          }));
      const rd = getRoundData(countries);
      console.log('setting round data', rd);
      setRoundData(rd);
    }, 800);
  };

  useEffect(() => {
    // if (answers.correct !== prevCorrect.current) {
    //   setStreak((prev) => prev + 1);
    // } else if (answers.incorrect !== prevIncorrect.current) {
    //   setStreak(0);
    // }

    prevCorrect.current = answers.correct;

    const gameData = {
      userId: userContext?.user.id,
      answers: answers,
      accuracy: answersRef.current.correct / (answersRef.current.correct + answersRef.current.incorrect),
      lives: 2 - answersRef.current.incorrect,
      currentStreak: streak,
    }

    

      axios.post(`${getUrl()}/game/saveGame`, gameData).then((res) => {
        console.log('saved', res);
      }).catch((err) => {
        console.log('Error saving game', err);
      });

    setIsCorrectGuess(null);
  }, [answers]);
  
  // const { isLoading, error, data } = useQuery('countries', async () =>{

  //   axios.get(`${getUrl()}/game/countries`).then((res) => {
  //     const test = res.data;
  //     console.log('data', test);
  //     const roll = rollDifficulty();
  //     const options = getOptions(roll, test);
  //     const pick = pickCountry(options);
  //     console.log(roll, options, pick);
  
  //     const data: RoundData = getRoundData(test);
  //     console.log('setting round data', data);
  //     setRoundData(data);
  //     setCountries(countries.filter((country: any) => country.name !== pick.name));
  //     return res.data
  //   })

  // }
  // );

  useEffect(() => {
console.log(gameContext?.currentGame);
    // setAnswers( !gameContext?.currentGame.gameOver ? gameContext?.currentGame.answers : { correct: 0, incorrect: 0 });
    // setStreak(!gameContext?.currentGame.gameover ? gameContext?.currentGame.currentStreak : 0);
    const fetchCountries = async () => {
      const _countries = await axios.get(`${getUrl()}/game/countries`);
      setCountries(_countries.data);
      const roll = rollDifficulty();
      const options = getOptions(roll, _countries.data); // Use _countries.data instead of countries
      const pick = pickCountry(options);
    
      const data: RoundData = getRoundData(_countries.data); // Use _countries.data instead of countries
      setRoundData(data);
      setLoading(false);
      setCountries(_countries.data.filter((country:any) => country.name !== pick.name)); // Use _countries.data instead of countries
    }
    fetchCountries();
    return () => { 
      // const gameData = {
      //   userId: userContext?.user.id,
      //   answers: answersRef.current,
      //   accuracy: answersRef.current.correct / (answersRef.current.correct + answersRef.current.incorrect),
      //   lives: 2 - answersRef.current.incorrect,
      //   currentStreak: streakRef.current,
      // }
      // console.log('DISMOUNT GAME'.repeat(20));
      // console.log('before saving',gameContext?.currentGame);
      // if (gameContext?.currentGame.gameOver) {

      //   axios.post(`${getUrl()}/game/saveGame`, gameData).then((res) => {
      //     console.log('saved', res);
      //   }).catch((err) => {
      //     console.log('Error saving game', err);
      //   });
      // }
      console.log('DISMOUNT GAME'.repeat(20));
    }
  }, []);

  useEffect(() => {
    setCountries(prev => prev.filter((country) => country.name !== round?.name));
  }, [round]);

  useEffect(() => {
    // const handleKeyDown = (event: KeyboardEvent) => {
    //   if (event.key === 'Escape') {
    //     setIsModalOpen(true);
    //   }
    // };
  
    // window.addEventListener('keydown', handleKeyDown);
  
    // return () => {
    //   window.removeEventListener('keydown', handleKeyDown);
    // };
    console.log('#'.repeat(20));
    console.log(streak);
    console.log('#'.repeat(20));
  }, []);
  
  return (

    <div>
    {!loading && round &&(
      <FlagComponent
      countryCode={round!.code}
      isCorrectGuess={isCorrectGuess}
      />
      )}
       {!loading && round &&(

         <CounterComponent
         answers={answers}
         handleGameOver={handleGameOver}
         />
         )}
  <StreakComponent streakCount={streak} />
  {!loading && round &&(
    <GuessComponent
    buttonLabels={round!.options}
    onClick={processGuess}
    solution={round!.name}
    />
    )}
    </div>
  
  );
}

export default GameComponent;