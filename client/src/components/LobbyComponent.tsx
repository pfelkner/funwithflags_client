import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { getUrl } from "../hooks/getUrl";

function LobbyComponent() {
  const navigate = useNavigate();
  const { user } : any = useContext(UserContext);
  const [leaders, setLeader]:any = useState(null);

  const handlePlayClick = async () => {

    navigate("/funwithflags");
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios.get(`${getUrl()}/auth/users`);
      const scores = await axios.get(`${getUrl()}/score`);


      const highscores = scores.data.sort((a:any, b:any) => b.highestStreak - a.highestStreak).slice(0, 3);
      console.log(highscores);
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
      {leaders
        ? leaders.map((leader:any, index:number) => (
            <h2 key={index}>
              {index + 1}. place: {leader.name} with a streak of&nbsp;
              {leader.streak}
            </h2>
          ))
        :
        <section>
          <h2>
            <Skeleton variant="text" sx={{ fontSize: '3rem', width: '30rem' }} />
          </h2>
          <h2>
            <Skeleton variant="text" sx={{ fontSize: '3rem', width: '30rem' }} />
            </h2>
          <h2>
            <Skeleton variant="text" sx={{ fontSize: '3rem', width: '30rem' }} />
          </h2>
        </section>
        }
      <Button variant="contained" color="primary" onClick={handlePlayClick}>
        Play
      </Button>
    </div>
  );
}

export default LobbyComponent;
