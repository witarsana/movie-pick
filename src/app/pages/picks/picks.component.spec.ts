import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieService } from 'src/app/services/movie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PicksComponent } from './picks.component';

describe('Picks Component', () => {
  let component: PicksComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<PicksComponent>;
  let location: Location;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [MovieService, NotificationService, RouterTestingModule],
      declarations: [PicksComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PicksComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        location = TestBed.get(Location);
      });
  });

  //   it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });
});
