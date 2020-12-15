import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MovieService } from 'src/app/services/movie.service';

import { LastpickComponent } from './lastpick.component';

describe('LastPick Component', () => {
  let component: LastpickComponent;
  let fixture: ComponentFixture<LastpickComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [MovieService, FavoriteService],
      declarations: [LastpickComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LastpickComponent);
        component = fixture.componentInstance;
      });
  });

  //   it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });
});
