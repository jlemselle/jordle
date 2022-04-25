import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyComponent } from './key.component';
import { SpotComponent } from './spot.component';

@NgModule({
  declarations: [AppComponent, SpotComponent, KeyComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
