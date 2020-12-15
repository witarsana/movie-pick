import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieService } from 'src/app/services/movie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { MovieComponent } from './movie.component';

let mockRouter: any;
class MockRouter {
  navigate = jasmine.createSpy('movie');
}

describe('Movie Component', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule],
      providers: [
        MovieService,
        NotificationService,
        RouterTestingModule,
        {
          provide: ActivatedRoute,
          useValue: {
            data: {
              subscribe: (fn: (value: Data) => void) =>
                fn({
                  id: 1,
                }),
            },
            params: {
              subscribe: (fn: (value: Params) => void) =>
                fn({
                  id: 1,
                }),
            },
            snapshot: {
              url: [
                {
                  path: 'foo',
                },
                {
                  path: 'bar',
                },
                {
                  path: 'baz',
                },
              ],
            },
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
      declarations: [MovieComponent],
    }).compileComponents();
  });

  // it('should create', () => {
  //   const fixture = TestBed.createComponent(MovieComponent);
  //   const component = fixture.componentInstance;
  //   expect(component).toBeTruthy();
  // });
});
