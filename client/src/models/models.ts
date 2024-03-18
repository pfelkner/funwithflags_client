export interface Answers {
  correct: number;
  incorrect: number;
}

export interface RoundData {
  name: string;
  code: string;
  options: string[];
}

export interface Country {
  id: number;
  name: string;
  code: string;
  population: number;
  difficulty: number;
}
