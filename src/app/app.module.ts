import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// Pipes
import { TimePipe } from './pipes/time.pipe';

import { MoviesComponent } from './pages/movies/movies.component';
import { MovieComponent } from './pages/movie/movie.component';
import { PicksComponent } from './pages/picks/picks.component';
import { ParentComponent } from './components/parent/parent.component';

import { DatetimerangepickerModule } from 'angular-datetimerangepicker';
import { ToasterModule } from 'angular2-toaster';
import { FavoriteService } from './services/favorite.service';
import { LastpickComponent } from './components/lastpick/lastpick.component';
@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    PicksComponent,
    ParentComponent,
    TimePipe,
    LastpickComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DatetimerangepickerModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [FavoriteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
