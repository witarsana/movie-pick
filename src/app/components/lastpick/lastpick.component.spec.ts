import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MovieService } from 'src/app/services/movie.service';
import { LastpickComponent } from './lastpick.component';

describe('LastPick Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule],
      providers: [MovieService, FavoriteService],
      declarations: [LastpickComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LastpickComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
