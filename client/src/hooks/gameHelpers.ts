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
  const sorted = countries.sort((a, b) => a.population + b.population);
  let twelvePercent = Math.floor(sorted.length * 0.12);
  let twentyfivePercent = Math.floor(sorted.length * 0.25);
  let sixtythreePercent = Math.floor(sorted.length * 0.63);

  let easy = sorted.slice(0, twelvePercent);
  let medium = sorted.slice(0, twentyfivePercent);
  let hard = sorted.slice(0, sixtythreePercent);

  let picks: Country[] = [];
  let usedIndexes: Set<number> = new Set();
  roll.forEach((difficulty) => {
    let chosenArray;
    if (difficulty === 1) {
      chosenArray = easy;
    } else if (difficulty === 2) {
      chosenArray = medium;
    } else {
      chosenArray = hard;
    }

    let index = getRandom(chosenArray.length - 1);
    while (usedIndexes.has(index)) {
      index = getRandom(chosenArray.length - 1);
    }
    usedIndexes.add(index);
    picks.push(chosenArray[index]);
  });

  console.log("#".repeat(20));
  console.log(picks);
  console.log("#".repeat(20));

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
