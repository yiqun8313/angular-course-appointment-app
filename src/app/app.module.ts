import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { TrafficLightComponent } from './traffic-light.component';
import { TimerComponent } from './timer.component';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { StarRatingComponent } from './star-rating.component';
import { RecursiveMenuComponent } from './recursive-menu.component';
import { ProgressBarComponent } from './progress-bar.component';
import { MemoryGameComponent } from './memory-game.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TrafficLightComponent,
    TimerComponent,
    TicTacToeComponent,
    StarRatingComponent,
    RecursiveMenuComponent,
    ProgressBarComponent,
    MemoryGameComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
