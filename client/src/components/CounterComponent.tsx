import React, { useContext, useEffect, useState } from "react";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { green, red, blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUrl } from "../hooks/getUrl";
import UserContext from "../context/UserContext";


interface CounterComponentProps {
  answers: {
    correct: number;
    incorrect: number;
  };
  handleGameOver: () => void;
}

const CounterComponent = ({
  answers: { correct, incorrect },
  handleGameOver,
}: CounterComponentProps) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [accuracy, setAccuracy] = useState(0);
  const totalLife = 2;
  const remainingLifes = totalLife - incorrect;

  useEffect(() => {
    if (incorrect === totalLife) {
      handleGameOver();
      axios.get(`${getUrl()}/game/gameover/${userContext?.user.id}`);
      navigate("/lobby");
    }
  }, [incorrect, navigate]);

  useEffect(() => {
    const totalAttempts = correct + incorrect;
    const newAccuracy = totalAttempts > 0 ? (correct / totalAttempts) * 100 : 0;
    setAccuracy(newAccuracy);
  }, [correct, incorrect]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "1.2rem",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "1.2rem",
        }}
      >
        <TaskAltOutlinedIcon style={{ color: green[500], fontSize: "2rem" }} />
        <span>{correct}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "1.2rem",
        }}
      >
        <FavoriteBorderIcon style={{ color: red[500], fontSize: "2rem" }} />
        <span>{remainingLifes}</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "1.2rem",
        }}
      >
        <CrisisAlertOutlinedIcon
          style={{ color: blue[500], fontSize: "2rem" }}
        />
        <span> {accuracy.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default CounterComponent;
