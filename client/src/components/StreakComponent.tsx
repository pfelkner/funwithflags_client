import React, { useContext, useEffect, useState } from "react";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import {yellow } from "@mui/material/colors";
import axios from "axios";
import UserContext from "../context/UserContext";
import { getUrl } from "../hooks/getUrl";
import { useUserId } from "../hooks/user";

interface StreakComponentProps {
  streakCount: number;
}



const StreakComponent = ({ streakCount }:StreakComponentProps ) => {
  const [highestStreak, setHighestStreak] = useState(0);
  const { user } : any = useContext(UserContext);
  const userId = useUserId();

useEffect(() => {
  axios
    .get(`${getUrl()}/score/${userId}`)
    .then((response) => {
      setHighestStreak(response.data.highestStreak);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}, []);

  useEffect(() => {
      axios.post(`${getUrl()}/score/update`, {
        userId: userId,
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
