import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LetterState } from '@jordle/jordle-core';

@Component({
  template: ` <button
    type="button"
    class="btn m-1"
    [class.btn-light]="result === 0"
    [class.btn-success]="result === 1"
    [class.btn-dark]="result === 2"
    (click)="pressed.emit(letter)"
  >
    {{ letter | uppercase }}
  </button>`,
  selector: 'jordle-virtual-key',
})
export class VirtualKeyComponent {
  @Input() letter = '';
  @Input() result: LetterState = LetterState.UNKNOWN;
  @Output() pressed: EventEmitter<string> = new EventEmitter<string>();
}
