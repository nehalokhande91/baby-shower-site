
export interface Participant {
  id: string;
  name: string;
  score: number;
}

export interface GameQuestion {
  id: number;
  question: string;
  answer: string | string[];
  options?: string[];
  points?: number[];
}

export type GameType = 'FEUD' | 'TRIVIA' | 'FACTS' | 'PRICES' | 'EMOJI';

export interface Game {
  id: GameType;
  title: string;
  description: string;
  questions: GameQuestion[];
}
