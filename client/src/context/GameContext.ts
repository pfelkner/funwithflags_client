import React from "react";

interface GameContextValue {
  currentGame: any; // Replace any with the actual type of currentGame
  setCurrentGame: React.Dispatch<React.SetStateAction<any>>; // Replace any with the actual type of currentGame
}

const GameContext = React.createContext<GameContextValue | null>(null);

export default GameContext;
