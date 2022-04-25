import { Component, Input } from '@angular/core';
import { GuessResult } from '@jordle/jordle-core';

@Component({
  template: ` <div
    class="card text-center m-1"
    style="width: 4rem; height: 4rem;"
    [class.bg-light]="result === 0"
    [class.bg-success]="result === 1"
    [class.bg-warning]="result === 2"
  >
    <div class="card-body">
      <h5 class="card-title">{{ letter | uppercase }}</h5>
    </div>
  </div>`,
  selector: 'app-letter-cell',
})
export class LetterCellComponent {
  @Input() letter: string = '';
  @Input() result: GuessResult | undefined;
}
