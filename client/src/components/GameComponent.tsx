import React, { useEffect, useRef, useState } from "react";
import CounterComponent from "./CounterComponent";
import FlagComponent from "./FlagComponent";
import StreakComponent from "./StreakComponent";
import GuessComponent from "./GuessComponent";
import axios from "axios";


interface Answers {
  correct: number;
  incorrect: number;
}

interface Country {
  name: string;
  code: string;
  options: string[];
}

const GameComponent = () => {
  const [answers, setAnswers] = useState<Answers>({ correct: 0, incorrect: 0 });
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [country, setCountry] = useState<Country |null>(null);
  const [streak, setStreak] = useState<number>(0);

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
      getCountry();
    }, 800);
  };

  const getCountry = () => {
    setLoading(true);
    axios
      .get("https://fwfserver.vercel.app/game/nextRound")
      // .get("http://localhost:8080/game/nextRound")
      .then((resp) => {
        const data = resp.data;
        console.log('App:nextround'.repeat(20));
        console.log(data);
        console.log('App:nextround'.repeat(20));
        setCountry(data);
        setLoading(false);
      })
      .catch((error) => {
        //TODO
        console.error(error);
      });
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
    getCountry();
  }, []);
  
  return (
    <div>

    {!loading && (
      <FlagComponent
      countryCode={country!.code}
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
    buttonLabels={country!.options}
    onClick={processGuess}
    solution={country!.name}
    />
  )}
    </div>
  
  );
}

export default GameComponent;