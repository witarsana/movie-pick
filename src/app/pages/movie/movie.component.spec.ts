import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieComponent } from 'src/app/pages/movie/movie.component';
import { MovieService } from 'src/app/services/movie.service';
import { NotificationService } from 'src/app/services/notification.service';

describe('Movie Component', () => {
  let component: MovieComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<MovieComponent>;
  let location: Location;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [MovieService, NotificationService, RouterTestingModule],
      declarations: [MovieComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MovieComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        location = TestBed.get(Location);
      });
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should create link of menu', () => {
  //   const el = element.querySelector('.left-menu');
  //   expect(el.children.length).toBeGreaterThan(0);
  // });
});
