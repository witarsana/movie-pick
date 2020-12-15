import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Favorite, FavoriteService } from 'src/app/services/favorite.service';
import { MovieService } from 'src/app/services/movie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  id: number;
  movie: any;
  baseUrlImage = environment.imageBaseDrop;

  constructor(
    private movieServ: MovieService,
    private activedRoute: ActivatedRoute,
    private favServ: FavoriteService,
    private notifServ: NotificationService
  ) {
    this.id = this.activedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.isError = false;
    this.movieServ
      .getMovie(this.id)
      .toPromise()
      .then((res) => {
        this.movie = res;
      })
      .catch((err) => {
        console.log(err);
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false;
      });
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
}
