import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LetterState } from '@jordle/jordle-core';
import { LetterStateProvider } from '@jordle/jordle-core';
import {
  getKeys,
  getBackspaceText,
  getEnterText,
  KeyboardLayout,
} from './layouts';

@Component({
  selector: 'jordle-virtual-keyboard',
  template: `
    <div class="d-flex flex-row justify-content-center my-2">
      <jordle-virtual-key
        *ngFor="let key of topKeys"
        [letter]="key"
        [result]="letterState(key)"
        (pressed)="input($event)"
      ></jordle-virtual-key>
    </div>
    <div class="d-flex flex-row justify-content-center my-2">
      <jordle-virtual-key
        *ngFor="let key of middleKeys"
        [letter]="key"
        [result]="letterState(key)"
        (pressed)="input($event)"
      ></jordle-virtual-key>
    </div>

    <div class="d-flex flex-row justify-content-center my-2">
      <jordle-virtual-key
        [letter]="enterText"
        (pressed)="enter()"
      ></jordle-virtual-key>
      <jordle-virtual-key
        *ngFor="let key of bottomKeys"
        [letter]="key"
        [result]="letterState(key)"
        (pressed)="input($event)"
      ></jordle-virtual-key>
      <jordle-virtual-key
        [letter]="backspaceText"
        (pressed)="backspace()"
      ></jordle-virtual-key>
    </div>
  `,
})
export class VirtualKeyboardComponent implements OnInit {
  public layoutKeys?: string[][];
  @Input() letterStateProvider?: LetterStateProvider;
  @Input() layout: KeyboardLayout = KeyboardLayout.Azerty;
  @Output() keyPressed: EventEmitter<string> = new EventEmitter<string>();
  @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() backspacePressed: EventEmitter<void> = new EventEmitter<void>();

  get topKeys(): string[] {
    return this.layoutKeys && this.layoutKeys[0] ? this.layoutKeys[0] : [];
  }

  get middleKeys(): string[] {
    return this.layoutKeys && this.layoutKeys[1] ? this.layoutKeys[1] : [];
  }

  get enterText(): string {
    return getEnterText(this.layout);
  }

  get bottomKeys(): string[] {
    return this.layoutKeys && this.layoutKeys[2] ? this.layoutKeys[2] : [];
  }

  get backspaceText(): string {
    return getBackspaceText(this.layout);
  }

  ngOnInit(): void {
    this.layoutKeys = getKeys(this.layout);
  }

  input(char: string) {
    this.keyPressed.emit(char);
  }

  enter() {
    this.enterPressed.emit();
  }

  backspace() {
    this.backspacePressed.emit();
  }

  letterState(letter: string): LetterState {
    if (this.letterStateProvider) {
      return this.letterStateProvider.letterState(letter);
    }

    return LetterState.UNKNOWN;
  }
}
