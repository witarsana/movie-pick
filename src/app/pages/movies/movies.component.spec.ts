import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesComponent } from 'src/app/pages/movies/movies.component';
import { MovieService } from 'src/app/services/movie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

let mockRouter: any;
class MockRouter {
  navigate = jasmine.createSpy('movies');
}

describe('Movies Component', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule],
      providers: [
        MovieService,
        NotificationService,
        RouterTestingModule,

        { provide: Router, useValue: mockRouter },
      ],
      declarations: [MoviesComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MoviesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
