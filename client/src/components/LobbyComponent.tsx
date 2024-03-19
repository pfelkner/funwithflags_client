import React, { useContext, useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableRow, TableContainer, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { getUrl } from "../hooks/getUrl";
import GameContext from "../context/GameContext";


function LobbyComponent() {
  const navigate = useNavigate();
  const { user } : any = useContext(UserContext);
  const [leaders, setLeader]:any = useState(null);
  const [hasCurrentGame, setHasCurrentGame] = useState(false);
  let fetchedData: any = null;
  const gameContext = useContext(GameContext);



  const handlePlayClick = async () => {
    navigate("/funwithflags");
  };

  const handleContinueClick = () => {
    navigate("/funwithflags"); 
  };

  useEffect(() => {
    console.log('lobby:fetchdata');
    const fetchData = async () => {
      const users = await axios.get(`${getUrl()}/auth/users`);

      const currentGame = await axios.get(`${getUrl()}/game/current/${user.id}`);
      if (currentGame.data != '' && gameContext) {
        console.log('lobby:', currentGame, gameContext.currentGame);
        fetchedData = currentGame.data;
        gameContext?.setCurrentGame(currentGame.data);
        setHasCurrentGame(true);
      }

      const scores = await axios.get(`${getUrl()}/score`);


      const highscores = scores.data.sort((a:any, b:any) => b.highestStreak - a.highestStreak).slice(0, 3);
      const leaders = highscores.map((score:any) => {
        const user = users.data.find((u:any) => u.id === score.userId);
        return { name: user.name, streak: score.highestStreak };
      })
      setTimeout(() => {
        setLeader(leaders);
      }, 500);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {user && (

        <h1>Welcome {user?.name} to the Flag Guessing Game!</h1>
      )}
       <TableContainer component={Paper} elevation={3} style={{ maxWidth: 400, marginTop: "20px" }}>
        <Table>
          <TableBody >
            {leaders ? leaders.map((leader:any, index:number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}. place
                </TableCell>
                <TableCell align="right">{leader.name}</TableCell>
                <TableCell align="right">{leader.streak}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                  <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                  <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handlePlayClick}>
        Play
      </Button> 
       <Button
        variant="contained"
        color="secondary"
        onClick={handleContinueClick}
        disabled={!hasCurrentGame}
        style={{ marginTop: "10px" }} 
      >
        Continue
      </Button>
    </div>
  );
}

export default LobbyComponent;
