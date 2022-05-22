import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { KeyboardModule } from './keyboard/keyboard.module';
import { LetterCellComponent } from './letter-cell.component';

@NgModule({
  declarations: [AppComponent, LetterCellComponent],
  imports: [BrowserModule, KeyboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
