import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieComponent } from 'src/app/pages/movie/movie.component';
import { MoviesComponent } from 'src/app/pages/movies/movies.component';
import { PicksComponent } from 'src/app/pages/picks/picks.component';
import { ParentComponent } from './parent.component';

describe('Parent Component', () => {
  const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
      path: '',
      component: ParentComponent,
      children: [
        { path: 'home', component: MoviesComponent },
        { path: 'movie/:id', component: MovieComponent },
        { path: 'mypick', component: PicksComponent },
      ],
    },
  ];
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule.withRoutes(routes)],
      providers: [Location],
      declarations: [ParentComponent],
    })
      .compileComponents()
      .then(() => {
        location = TestBed.get(Location);
      });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ParentComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should create link of menu', () => {
    const fixture = TestBed.createComponent(ParentComponent);
    const component = fixture.componentInstance;
    const element = fixture.nativeElement;
    const el = element.querySelector('.left-menu');
    expect(el.children.length).toBeGreaterThan(0);
  });
});
