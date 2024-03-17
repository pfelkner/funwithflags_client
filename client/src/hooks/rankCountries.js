import { pick } from "lodash";
import enhanced from "../assets/country-pop-cont-abb.json";
import withDiff from "../assets/with-difficulty.json";
const getWithDifficulty = () => {
  const byPopulation = enhanced.sort((a, b) => b.population - a.population);
  const third = Math.ceil(byPopulation.length / 3);

  const withDifficulty = byPopulation.map((country, index) => {
    let difficulty;
    if (index < third) {
      difficulty = 1;
    } else if (index < 2 * third) {
      difficulty = 2;
    } else {
      difficulty = 3;
    }

    return { ...country, difficulty };
  });
  return withDifficulty;
};

export function rollDifficulty() {
  // const easy = withDiff.filter((country) => country.difficulty === 1);
  // const medium = withDiff.filter((country) => country.difficulty === 2);
  // const hard = withDiff.filter((country) => country.difficulty === 3);
  // console.log(easy.length, medium.length, hard.length);

  const numbers = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
  const roll = [];
  for (let i = 0; i < 4; i++) {
    const index = Math.ceil(Math.random() * 10);
    const result = numbers[index];
    roll.push(result);
  }
  // console.log(roll);
  return roll;
}

export const _pickCountries = () => {
  const easy = withDiff.filter((country) => country.difficulty === 1);
  const medium = withDiff.filter((country) => country.difficulty === 2);
  const hard = withDiff.filter((country) => country.difficulty === 3);
  const roll = rollDifficulty();
  console.log(roll);
  const picks = [];
  roll.forEach((difficulty) => {
    if (difficulty === 1) {
      const index = Math.floor(Math.random() * easy.length);
      picks.push(easy[index]);
    } else if (difficulty === 2) {
      const index = Math.floor(Math.random() * medium.length);
      picks.push(medium[index]);
    } else {
      const index = Math.floor(Math.random() * hard.length);
      picks.push(hard[index]);
    }
  });
  console.log(picks);
  return picks;
};
const pickCountries = (roll, easy, medium, hard) => {
  console.log(roll);
  const picks = [];
  roll.forEach((difficulty) => {
    if (difficulty === 1) {
      const index = Math.floor(Math.random() * easy.length);
      picks.push(easy[index]);
    } else if (difficulty === 2) {
      const index = Math.floor(Math.random() * medium.length);
      picks.push(medium[index]);
    } else {
      const index = Math.floor(Math.random() * hard.length);
      picks.push(hard[index]);
    }
  });
  console.log(picks);
  return picks;
};

export const _pickCountry = () => {
  const picks = _pickCountries();
  const randomIndex = getRandom(4);
  return picks[randomIndex];
};
export const pickCountry = (picks) => {
  const randomIndex = getRandom(4);
  return picks[randomIndex];
};

const getRandom = (ceil) => {
  return Math.floor(Math.random() * ceil);
};

export default pickCountries;
