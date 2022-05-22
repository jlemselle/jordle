import { LetterState } from './jordle-core';

export interface LetterStateProvider {
  letterState(letter: string): LetterState;
}
