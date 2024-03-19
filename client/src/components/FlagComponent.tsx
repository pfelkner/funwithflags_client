import React from "react";
import Card from "@mui/material/Card";

interface FlagComponentProps {
  countryCode: string;
  isCorrectGuess: boolean | null;
}

const FlagComponent = ({ countryCode, isCorrectGuess }: FlagComponentProps) => {
  const link = `https://flagcdn.com/w320/${countryCode}.png`;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Card
        style={
          isCorrectGuess === null
            ? { boxShadow: "0px 0px 2em 2em rgba(128, 128, 128, 0.4)" } // Even lighter and wider grey shadow
            : isCorrectGuess
            ? { boxShadow: "0px 0px 2em 2em rgba(0, 128, 0, 0.5)" } // Even lighter and wider green shadow
            : { boxShadow: "0px 0px 2em 2em rgba(255, 0, 0, 0.5)" } // Even lighter and wider red shadow
        }
      >
        <img
          src={link}
          alt="Flag"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Card>
    </div>
  );
};

export default FlagComponent;
