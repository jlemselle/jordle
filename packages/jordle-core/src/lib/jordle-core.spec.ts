import { GuessResult, Jordle, jordleCore, LetterState } from './jordle-core';

const FIRST_LETTER = 'a';
const SECOND_LETTER = 'b';
const WRONG_LETTER = 'x';
const ONLY_LETTER = 'a';

describe('Jordle Core', () => {
  let jordle: Jordle;
  beforeEach(() => {
    jordle = new Jordle(`${FIRST_LETTER}${SECOND_LETTER}`);
  });

  it('should work', () => {
    expect(jordleCore()).toEqual('jordle-core');
  });

  it('should be able to guess word', () => {
    jordle.guess(`${FIRST_LETTER}${SECOND_LETTER}`);
    expect(jordle.isComplete()).toBe(true);
  });

  it('should show right letter in right location', () => {
    const guess = jordle.guess(`${FIRST_LETTER}${WRONG_LETTER}`);
    expect(guess).toStrictEqual([
      GuessResult.CORRECT_SPOT,
      GuessResult.NOT_IN_WORD,
    ]);
  });

  it('should show right letter in wrong location', () => {
    const guess = jordle.guess(`${WRONG_LETTER}${FIRST_LETTER}`);
    expect(guess).toStrictEqual([
      GuessResult.NOT_IN_WORD,
      GuessResult.WRONG_SPOT,
    ]);
  });

  it('should error if guess is wrong length', () => {
    expect(() => jordle.guess(`${WRONG_LETTER}`)).toThrow(
      'Guess must be the same length as word'
    );
  });

  it('should match letters once', () => {
    const guess = jordle.guess(`${SECOND_LETTER}${SECOND_LETTER}`);
    expect(guess).toStrictEqual([
      GuessResult.NOT_IN_WORD,
      GuessResult.CORRECT_SPOT,
    ]);
  });
});

describe('mutliple letter behaviour', () => {
  let jordle: Jordle;
  beforeEach(() => {
    jordle = new Jordle(`${ONLY_LETTER}${ONLY_LETTER}`);
  });

  it('should handle matching multiple letters', () => {
    const guess = jordle.guess(`${ONLY_LETTER}${ONLY_LETTER}`);
    expect(guess).toStrictEqual([
      GuessResult.CORRECT_SPOT,
      GuessResult.CORRECT_SPOT,
    ]);
  });
});

describe('letter checker', () => {
  let jordle: Jordle;
  beforeEach(() => {
    jordle = new Jordle(`aaaaa`);
  });

  it('should have all letters available to begin', () => {
    [...'abcdefghijklmnopqrstuvwxyz'].forEach((letter) => {
      expect(jordle.letterState(letter)).toBe(LetterState.UNKNOWN);
    });
  });

  it('should remove letters not in word after guess', () => {
    jordle.guess('aword');
    [...'word'].forEach((letter) => {
      expect(jordle.letterState(letter)).toBe(LetterState.NOT_IN_WORD);
    });
    expect(jordle.letterState('a')).toBe(LetterState.IN_WORD);
  });
});
