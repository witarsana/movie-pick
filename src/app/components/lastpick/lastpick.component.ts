import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Favorite, FavoriteService } from 'src/app/services/favorite.service';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lastpick',
  templateUrl: './lastpick.component.html',
  styleUrls: ['./lastpick.component.scss'],
})
export class LastpickComponent implements OnInit, OnDestroy {
  subcribtion: Subscription;
  movies: any = [];
  baseUrlImage = environment.imageBaseUrl;
  constructor(
    private favServ: FavoriteService,
    private movieServ: MovieService
  ) {}

  ngOnInit(): void {
    this.subcribtion = this.favServ.favoriteList.subscribe((res) => {
      this.getList(res);
    });
  }

  async getList(favorites: Favorite[]) {
    if (!favorites || favorites.length == 0) return (this.movies = []);
    favorites.sort((a, b) => {
      return b.date - a.date;
    });
    try {
      const result = await this.movieServ.getDetailByArray(favorites);
      this.movies = result;
      this.movies.map((mv) => {
        const date = favorites.find((fav) => fav.id == mv.id);
        mv['date_pick'] = date.date;
        return mv;
      });
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.subcribtion.unsubscribe();
  }
}
