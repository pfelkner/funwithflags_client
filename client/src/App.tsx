import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import LobbyComponent from "./components/LobbyComponent";
import ResponsiveAppBar from "./components/NavBar";
import UserContext from "./context/UserContext";
import GameComponent from "./components/GameComponent";
import { QueryClient, QueryClientProvider } from "react-query";
import  GameContext  from "./context/GameContext";

function App() {

  const [user, setUser] = useState<any>(null); // TODO: define user type 
  const [currentGame, setCurrentGame] = useState<any>(null); // TODO: define user type 
  const queryClient = new QueryClient();

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <QueryClientProvider client={queryClient}>
    <GameContext.Provider value={{currentGame, setCurrentGame}}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lobby" element={
          <div>
            <ResponsiveAppBar />
            <LobbyComponent/>
          </div>
          }/>
          <Route
            path="/funwithflags"
            element={
              <div>
                <ResponsiveAppBar/>
                  <GameComponent/>
              </div>
            }
          />
        </Routes>
      </Router>
      </GameContext.Provider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
