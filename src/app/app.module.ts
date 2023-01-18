import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { PokemonCardsComponent } from './components/pokemon-cards/pokemon-cards.component';

@NgModule({
  declarations: [AppComponent, MenuHeaderComponent, PokemonCardsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
