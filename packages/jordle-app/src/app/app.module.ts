import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VirtualKeyboardKeyComponent } from './virtual-keyboard-key.component';
import { LetterCellComponent } from './letter-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterCellComponent,
    VirtualKeyboardKeyComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
