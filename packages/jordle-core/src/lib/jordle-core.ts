import { LetterStateProvider } from './letter-state-provider';

export function jordleCore(): string {
  return 'jordle-core';
}

export class Cell {
  constructor(public guessedLetter: string, public correctLetter: string) {}

  isCorrect(): boolean {
    return this.guessedLetter === this.correctLetter;
  }
}

export class RemainingLetters {
  constructor(private candidates: string[]) {}

  isRemaining(element: string) {
    return this.candidates.includes(element);
  }

  remove(element: string) {
    this.candidates.splice(this.candidates.indexOf(element), 1);
  }
}

export class GuessChecker {
  constructor(
    private word: string,
    private availableLetters: { [key: string]: LetterState }
  ) {}

  guess(guess: string): number[] {
    if (this.word.length !== guess.length) {
      throw new Error('Guess must be the same length as word');
    }

    const cells = [...guess].map(
      (guessedChar, index) => new Cell(guessedChar, this.word[index])
    );

    const remainingLetters = new RemainingLetters(
      cells
        .filter((cell) => !cell.isCorrect())
        .map((cell) => cell.correctLetter)
    );

    return this.calculateCellResults(cells, remainingLetters);
  }

  private calculateCellResults(
    cells: Cell[],
    remainingLetters: RemainingLetters
  ): GuessResult[] {
    return cells.map((cell) => {
      return this.calculateCellResult(cell, remainingLetters);
    });
  }

  private calculateCellResult(
    cell: Cell,
    remainingLetters: RemainingLetters
  ): GuessResult {
    if (cell.isCorrect()) {
      if (
        !this.availableLetters[cell.guessedLetter] ||
        this.availableLetters[cell.guessedLetter] === LetterState.UNKNOWN
      ) {
        this.availableLetters[cell.guessedLetter] = LetterState.IN_WORD;
      }
      return GuessResult.CORRECT_SPOT;
    } else if (remainingLetters.isRemaining(cell.guessedLetter)) {
      if (
        !this.availableLetters[cell.guessedLetter] ||
        this.availableLetters[cell.guessedLetter] === LetterState.UNKNOWN
      ) {
        this.availableLetters[cell.guessedLetter] = LetterState.IN_WORD;
      }
      remainingLetters.remove(cell.guessedLetter);
      return GuessResult.WRONG_SPOT;
    } else {
      if (
        !this.availableLetters[cell.guessedLetter] ||
        this.availableLetters[cell.guessedLetter] === LetterState.UNKNOWN
      ) {
        this.availableLetters[cell.guessedLetter] = LetterState.NOT_IN_WORD;
      }
      return GuessResult.NOT_IN_WORD;
    }
  }
}

export class Jordle implements LetterStateProvider {
  private guessChecker: GuessChecker;
  private availableLetters: { [key: string]: LetterState } = {};

  constructor(word: string) {
    this.guessChecker = new GuessChecker(word, this.availableLetters);
  }

  guess(guess: string): number[] {
    return this.guessChecker.guess(guess);
  }

  isComplete(): boolean {
    return true;
  }

  letterState(letter: string): LetterState {
    return this.availableLetters[letter] ?? LetterState.UNKNOWN;
  }
}

export enum GuessResult {
  NOT_IN_WORD,
  CORRECT_SPOT,
  WRONG_SPOT,
}

export enum LetterState {
  UNKNOWN,
  IN_WORD,
  NOT_IN_WORD,
}
