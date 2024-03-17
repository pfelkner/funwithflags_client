import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import LobbyComponent from "./components/LobbyComponent";
import ResponsiveAppBar from "./components/NavBar";
import UserContext from "./context/UserContext";
import GameComponent from "./components/GameComponent";

function App() {

  const [user, setUser] = useState<any>(null); // TODO: define user type 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lobby" element={
          <div>
            <ResponsiveAppBar />
            <LobbyComponent />
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
    </UserContext.Provider>
  );
}

export default App;
