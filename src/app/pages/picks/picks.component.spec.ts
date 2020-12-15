import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieService } from 'src/app/services/movie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PicksComponent } from './picks.component';

describe('Picks Component', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule],
      providers: [MovieService, NotificationService, RouterTestingModule],
      declarations: [PicksComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PicksComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
