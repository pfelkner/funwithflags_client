import React, { useState, createContext } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  // All of your logic here
  const [isCorrectGuess, setIsCorrectGuess] = useState(null);

  return (
    <GameContext.Provider value={{ isCorrectGuess, setIsCorrectGuess }}>
      {children}
    </GameContext.Provider>
  );
};
