import React, { useContext, useEffect, useState } from "react";
import CounterComponent from "./CounterComponent";
import FlagComponent from "./FlagComponent";
import StreakComponent from "./StreakComponent";
import GuessComponent from "./GuessComponent";
import axios from "axios";
import { getUrl } from "../hooks/getUrl";
import { getRoundData } from "../hooks/gameHelpers";
import { Answers, Country, RoundData } from "../models/models";
import useUser from "../context/_UserContext";
import GameContext from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { useUserId } from "../hooks/user";



const GameComponent = () => {
  const navigate = useNavigate();
  const userContext = useUser();
  const gameContext = useContext(GameContext);
  const userId = useUserId();
  
  const [answers, setAnswers] = useState<Answers>({ correct: 0, incorrect: 0 });
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [round, setRoundData] = useState<any |null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [prevCountires, setPrevCountries] = useState<string[]>([]);
  const handleGameOver = () => {
    setAnswers({ correct: 0, incorrect: 0 });
  };
  // Passed to GuessComponent
  // processes the users pick and updates state (triggers useEffect for round, answes and prevCountries)
  const processGuess = (isCorrect: boolean) => {
    setIsCorrectGuess(isCorrect);
    isCorrect ? setStreak((prev) => prev + 1) : setStreak(0);
    setTimeout(() => {
      isCorrect
        ? setAnswers((prev) => ({ ...prev, correct: prev.correct + 1 }))
        : setAnswers((prev) => ({
            ...prev,
            incorrect: prev.incorrect + 1,
          }));
      const roundData = getRoundData(countries);
      setRoundData(roundData);
      setPrevCountries([...prevCountires, roundData.name]);

    }, 800);
  };

  // Triggered when the answers state changes.
  // stores current game data to db
  // navigate to lobby if game over
  useEffect(() => {
    const gameData = {
      userId: userId,
      answers: answers,
      accuracy: answers.correct / (answers.correct + answers.incorrect),
      lives: 3 - answers.incorrect,
      currentStreak: streak,
      prevCountries: prevCountires,
    }

    axios.post(`${getUrl()}/game/saveGame`, gameData).then((res) => {
      const gameOver = res.data;
      if (gameOver) {
        gameContext?.setCurrentGame(
          {
            ...gameContext.currentGame,
            currentStreak: 0,
            answers: { correct: 0, incorrect: 0 },
          }
        )
        navigate("/lobby");
    }
    }).catch((err) => {
      console.error('Error saving game', err);
    });

    setIsCorrectGuess(null);
  }, [answers]);

  // Triggered when the component mounts. 
  // Sets dispaly data based on prev. game
  // fetches countries from db
  // sets round data (flag, options, name) 
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user') || '');
    if (storedUser) {
      userContext?.setUser(storedUser);
    }
    userContext?.setUser(storedUser);
    if (gameContext?.currentGame) {

      setAnswers(gameContext?.currentGame.answers);
      setStreak(gameContext?.currentGame.currentStreak);
    }
    const fetchCountries = async () => {
      const prevCountires = gameContext?.currentGame?.prevCountries || [];
      const countries = (await axios.get(`${getUrl()}/game/countries`))
      const roundData: RoundData = getRoundData(countries.data.filter((country:any) => !prevCountires.includes(country)));

      setPrevCountries([...prevCountires, roundData.name]);
      setRoundData(roundData);
      setCountries(countries.data.filter((country: Country) => country.name !== roundData.name));
      setLoading(false);
    }
    fetchCountries();

  }, []);

  // Triggered when the round data changes. Currently from fetchCountries-useEffect & processGuess)
  useEffect(() => {
    setCountries(prev => prev.filter((country) => country.name !== round?.name));
  }, [round]);
  
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
    buttonLabels={round!.options.sort()}
    onClick={processGuess}
    solution={round!.name}
    />
    )}
    </div>
  );
}

export default GameComponent;