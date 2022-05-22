import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VirtualKeyComponent } from './virtual-key.component';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';

@NgModule({
  declarations: [VirtualKeyboardComponent, VirtualKeyComponent],
  imports: [CommonModule],
  exports: [VirtualKeyboardComponent],
})
export class KeyboardModule {}
