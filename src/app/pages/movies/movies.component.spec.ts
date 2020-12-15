import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesComponent } from 'src/app/pages/movies/movies.component';
import { MovieService } from 'src/app/services/movie.service';
import { NotificationService } from 'src/app/services/notification.service';

describe('Movies Component', () => {
  let component: MoviesComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<MoviesComponent>;
  let location: Location;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [MovieService, NotificationService, RouterTestingModule],
      declarations: [MoviesComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MoviesComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        location = TestBed.get(Location);
      });
  });

  //   it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });
});
