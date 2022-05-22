import { Component } from '@angular/core';
import { GuessResult, Jordle, LetterState } from '@jordle/jordle-core';

interface GuessOutput {
  letter: string;
  result: GuessResult;
}

@Component({
  selector: 'jordle-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'jordle-app';
  wordle = new Jordle('atout');
  guess = '';
  pastGuesses: GuessOutput[][] = [];

  input(char: string) {
    if (this.guess.length < 5) {
      this.guess += char;
    }
  }

  enter() {
    if (this.guess.length === 5) {
      const result = this.wordle.guess(this.guess);
      this.pastGuesses.push(
        result.map((guessResult, index) => ({
          letter: this.guess[index],
          result: guessResult,
        }))
      );
      this.guess = '';
    }
  }

  backspace() {
    if (this.guess.length > 0) {
      this.guess = this.guess.slice(0, this.guess.length - 1);
    }
  }

  letterState(letter: string): LetterState {
    return this.wordle.letterState(letter);
  }
}
