import { LetterState } from '@jordle/jordle-core';

export interface LetterStateProvider {
  letterState(letter: string): LetterState;
}
