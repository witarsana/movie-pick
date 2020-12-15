import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { FilterMovie, MovieService } from 'src/app/services/movie.service';
import { Favorite, FavoriteService } from 'src/app/services/favorite.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  movies: Object;
  baseUrlImage = environment.imageBaseUrl;
  // filter
  filter: FilterMovie;
  page: number;
  totalPage: number;
  sort: 'asc' | 'desc';
  sortBy: string = 'popularity';
  selectedDate: any;
  // date piker
  daterangepickerOptions = {
    startDate: dayjs(),
    endDate: dayjs(),
    format: 'YYYY/MM/DD',
    minDate: dayjs().add(-100, 'year').format('YYYY/MM/DD'),
    maxDate: dayjs().add(100, 'year').format('YYYY/MM/DD'),
    inactiveBeforeStart: true,
    autoApply: true,
    weekStartsOn: 4,
    singleCalendar: false,
    displayFormat: 'YYYY/MM/DD',
    position: 'left',
    disabled: false,
    noDefaultRangeSelected: true,
    disableBeforeStart: true,
    alwaysOpen: false,
  };

  constructor(
    private movieServ: MovieService,
    private router: Router,
    private favServ: FavoriteService,
    private notifServ: NotificationService
  ) {}

  ngOnInit(): void {
    this.sort = 'desc';
    this.getList();
  }

  getList(page: number = 1) {
    this.isLoading = true;
    this.isError = false;
    this.filter = { page: page, sortBy: this.sortBy, statusSort: this.sort };
    if (this.selectedDate && this.selectedDate.start) {
      this.filter.dateStart = this.selectedDate.start.format('YYYY-MM-DD');
      this.filter.dateEnd = this.selectedDate.end.format('YYYY-MM-DD');
    }

    this.movieServ
      .getMovies(this.filter)
      .toPromise()
      .then((res) => {
        let data: any = res;
        this.page = data.page;
        this.totalPage = data.total_pages;
        return this.movieServ.getDetailByArray(data.results);
      })
      .then((res) => {
        this.movies = res;
      })
      .catch((err) => {
        console.log(err);
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  nextPage() {
    let destPage = this.page + 1;
    this.getList(destPage);
  }

  prevPage() {
    let destPage = this.page - 1;
    this.getList(destPage);
  }

  showDetail(id: number) {
    this.router.navigate(['movie', id]);
  }

  toogleSort() {
    if (this.sort == 'asc') this.sort = 'desc';
    else this.sort = 'asc';
    this.getList(1);
  }

  addFavorites(id: number) {
    const newfavorite: Favorite = {
      id: id,
      date: Date.now(),
    };
    if (this.favServ.checkExist(id))
      return this.notifServ.show(
        'warning',
        'Result',
        'The movie already exist in favorites'
      );
    if (this.favServ.add(newfavorite))
      return this.notifServ.show(
        'success',
        'Result',
        'Added to favorites succesfully'
      );

    return this.notifServ.show('error', 'Result', 'Added to favorites failed');
  }

  sortByChange(e) {
    this.sortBy = e;
    this.getList(1);
  }

  rangeSelected(e) {
    if (e.start.isValid()) this.selectedDate = e;
    else this.selectedDate = undefined;
    this.getList(1);
  }
}
