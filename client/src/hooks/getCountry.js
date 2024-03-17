import data from "./../countries.json";
import withDiff from "../assets/with-difficulty.json";
import enhanced from "../assets/country-pop-cont-abb.json";

let previousCountries = [];

const getRandom = (ceil) => {
  return Math.floor(Math.random() * ceil);
};

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

const rollDifficulty = () => {
  const numbers = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
  const roll = [];
  for (let i = 0; i < 4; i++) {
    const index = Math.ceil(Math.random() * 10);
    const result = numbers[index];
    roll.push(result);
  }
  // console.log(roll);
  return roll;
};

const pickCountries = (roll, easy, medium, hard) => {
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
  return picks;
};

const pickCountry = (picks) => {
  const randomIndex = getRandom(4);
  return picks[randomIndex];
};

const _getCountry = () => {
  const easy = withDiff.filter((country) => country.difficulty === 1);
  const medium = withDiff.filter((country) => country.difficulty === 2);
  const hard = withDiff.filter((country) => country.difficulty === 3);
  const roll = rollDifficulty();
  const picks = pickCountries(roll, easy, medium, hard);
  const pick = pickCountry(picks);

  // console.log("ROLL", picks);
};

const test = () => {
  const selectedCountry = _getCountry();
  const newList = withDiff.filter(
    (country) => country.name !== selectedCountry.name
  );
  return { selectedCountry, newList };
};

function getCountry() {
  const countries = data.countries;
  const keys = Object.keys(countries);
  const values = Object.values(countries);

  const getRandomEntries = () => {
    let randomEntries = [];
    for (let i = 0; randomEntries.length < 4; i++) {
      const randomIndex = getRandom(keys.length);
      if (
        !randomEntries.includes(randomIndex) &&
        !previousCountries.includes(randomIndex)
      ) {
        randomEntries.push(randomIndex);
      }
    }

    return randomEntries;
  };

  const randomEntries = getRandomEntries();

  const countryNames = randomEntries.map((index) => values[index]);
  const countryCodes = randomEntries.map((index) => keys[index]);
  const randomIndex = getRandom(4);
  const countryCode = countryCodes[randomIndex];
  const countryName = countryNames[randomIndex];
  previousCountries.push(randomEntries[randomIndex]);

  return { countryNames, countryName, countryCode };
}

export default getCountry;
