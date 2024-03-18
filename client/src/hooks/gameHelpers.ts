import { Country } from "../models/models";

const getRandom = (ceil: number): number => {
  return Math.ceil(Math.random() * ceil);
};

export const rollDifficulty = (): number[] => {
  const numbers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
  const result = Array.from(
    { length: 4 },
    () => numbers[getRandom(numbers.length - 1)]
  );
  return result;
};

export const getOptions = (roll: number[], countries: Country[]): Country[] => {
  const easy = countries.filter((country) => country.population >= 50000000);
  const medium = countries.filter((country) => country.population >= 10000000);
  const hard = countries.filter((country) => country.difficulty < 10000000);

  // See if map works or back to foreach
  const picks: Country[] = roll.map((difficulty) => {
    let chosenArray;
    if (difficulty === 1) {
      chosenArray = easy;
    } else if (difficulty === 2) {
      chosenArray = medium;
    } else {
      chosenArray = hard;
    }

    const index = getRandom(chosenArray.length - 1);
    // const index = Math.floor(Math.random() * chosenArray.length);
    return chosenArray[index];
  });

  return picks;
};

export const pickCountry = (picks: Country[]) => {
  const randomIndex = Math.floor(Math.random() * 4);
  return picks[randomIndex];
};

export const getRoundData = (countries: Country[]): any => {
  const roll = rollDifficulty();
  const options = getOptions(roll, countries);
  const pick = pickCountry(options);

  return {
    name: pick.name,
    code: pick.code,
    options: options.map((option) => option.name),
  };
};
