import { async, TestBed } from '@angular/core/testing';
import { FilterMovie, MovieService } from './movie.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
describe('Movie Service Unit Testing', () => {
  let service: MovieService;
  let httpTesting: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MovieService],
      imports: [HttpClientTestingModule],
    });

    httpTesting = TestBed.get(HttpTestingController);
    service = TestBed.get(MovieService);
  }));

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
