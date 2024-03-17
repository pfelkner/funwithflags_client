// MyComponent.js
import React, { useContext, useEffect, useState } from "react";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import { green, red, blue, yellow } from "@mui/material/colors";
import axios from "axios";
import useUser from "../context/_UserContext";
import UserContext from "../context/UserContext";
import { getUrl } from "../hooks/getUrl";

interface StreakComponentProps {
  streakCount: number;
}



const StreakComponent = ({ streakCount }:StreakComponentProps ) => {
  // const [streakCount, setStreakcount] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  // const userContext = useUser();
  const { user } : any = useContext(UserContext);

useEffect(() => {
  const userId = user.id;
  axios
    .get(`${getUrl()}/score/${userId}`)
    // .get(`http://localhost:8080/score/${userId}`)
    .then((response) => {
      console.log(response.data);
      setHighestStreak(response.data.highestStreak);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}, []);

  useEffect(() => {
      console.log('Unmounting StreakComponent', highestStreak, streakCount);
      axios.post(`${getUrl()}/score/update`, {
      // axios.post('http://localhost:8080/score/update', {
        userId: user.id,
        highestStreak: streakCount,
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
  }, [highestStreak, streakCount]);

  useEffect(() => {
    if (streakCount > highestStreak) {
      setHighestStreak(streakCount);
      console.log('highestStreak:', highestStreak);
      console.log('streakCount:', streakCount);
    }
  }, [streakCount]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "5vh",
        margin: "1rem",
      }}
    >
      <TimelineOutlinedIcon style={{ color: yellow[800], fontSize: "3rem" }} />
      <div style={{ margin: "1em" }}>{streakCount}</div>
      <AutoGraphOutlinedIcon style={{ color: yellow[800], fontSize: "3rem" }} />
      <div style={{ margin: "1em" }}> {highestStreak}</div>
    </div>
  );
};

export default StreakComponent;
