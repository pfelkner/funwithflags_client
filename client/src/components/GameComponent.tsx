import React, { useEffect, useRef, useState } from "react";
import CounterComponent from "./CounterComponent";
import FlagComponent from "./FlagComponent";
import StreakComponent from "./StreakComponent";
import GuessComponent from "./GuessComponent";
import axios from "axios";
import { getUrl } from "../hooks/getUrl";
import { getOptions, getRoundData, pickCountry, rollDifficulty } from "../hooks/gameHelpers";
import { Answers, Country, RoundData } from "../models/models";



const GameComponent = () => {
  // let countries: Country[] = [];
  const [answers, setAnswers] = useState<Answers>({ correct: 0, incorrect: 0 });
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [round, setRoundData] = useState<any |null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [countries, setCountries] = useState<Country[]>([]);

  const prevCorrect = useRef<number>(0);
  const prevIncorrect = useRef<number>(0);


  const handleGameOver = () => {
    setAnswers({ correct: 0, incorrect: 0 });
  };

  const processGuess = (isCorrect: boolean) => {
    setIsCorrectGuess(isCorrect);
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
    if (answers.correct !== prevCorrect.current) {
      setStreak((prev) => prev + 1);
    } else if (answers.incorrect !== prevIncorrect.current) {
      setStreak(0);
    }

    prevCorrect.current = answers.correct;
    prevIncorrect.current = answers.incorrect;
    setIsCorrectGuess(null);
  }, [answers]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setCountries(prev => prev.filter((country) => country.name !== round?.name));
  }, [round]);
  
  return (
    <div>

    {!loading && (
      <FlagComponent
      countryCode={round!.code}
      isCorrectGuess={isCorrectGuess}
      />
      )}
  <CounterComponent
    answers={answers}
    handleGameOver={handleGameOver}
    />
  <StreakComponent streakCount={streak} />
  {!loading && (
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