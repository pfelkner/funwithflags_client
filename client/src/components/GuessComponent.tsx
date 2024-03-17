import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { green, red } from "@mui/material/colors"; // Corrected import path for green and red
import { lighten } from "@mui/material/styles"; // Keep this for the 'lighten' function
import { useNavigate } from "react-router-dom";

interface GuessComponentProps {
  
  buttonLabels: string[];
  onClick: (isCorrect: boolean) => void;
  solution: string;
  
}

const GuessComponent = ({ buttonLabels, onClick, solution }: GuessComponentProps) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const onBtnClick = (label: string) => {
    const isCorrect = label === solution;
    setClicked(true);
    onClick(isCorrect);
  };
  
  const home = (event:any):void  => {
    navigate('/lobby');
  }
  return (
    <div style={{ padding: "5em" }}>
      {!clicked ? (
        <Grid container spacing={2}>
          {buttonLabels &&
            buttonLabels.map((label, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => onBtnClick(label)}
                  sx={{
                    ":hover": {
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                      transform: "scale(1.01)", // Slightly increase size
                    },
                    transition: "all 0.4s ease-in-out",
                  }}
                >
                  {label}
                </Button>
              </Grid>
            ))}
        </Grid>

      ) : (
        <Grid container spacing={2}>
          {buttonLabels.map((label, index) => (
            <Grid item xs={6} key={index}>
              <Button
                variant={label === solution ? "contained" : "outlined"}
                color={label === solution ? "success" : "error"}
                fullWidth
                onClick={() => onBtnClick(label)}
                sx={{
                  ":hover": {
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    transform: "scale(1.02)", // Maintain slight size increase on hover
                    backgroundColor:
                      label === solution
                        ? lighten(green[500], 0.2)
                        : lighten(red[500], 0.2), // Lighter color on hover for success/error buttons
                  },
                }}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default GuessComponent;
