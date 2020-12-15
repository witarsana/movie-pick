import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieComponent } from 'src/app/pages/movie/movie.component';
import { MoviesComponent } from 'src/app/pages/movies/movies.component';
import { PicksComponent } from 'src/app/pages/picks/picks.component';
import { ParentComponent } from './parent.component';

describe('Parent Component', () => {
  let component: ParentComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<ParentComponent>;
  let location: Location;
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
        fixture = TestBed.createComponent(ParentComponent);
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
