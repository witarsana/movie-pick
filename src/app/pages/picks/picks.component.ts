import { Component, OnInit } from '@angular/core';
import { FavoriteService, Favorite } from 'src/app/services/favorite.service';
import { MovieService } from 'src/app/services/movie.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  baseUrlImage = environment.imageBaseUrl;
  movies: any = [];
  constructor(
    private favServ: FavoriteService,
    private movieServ: MovieService,
    private notifServ: NotificationService
  ) {}

  ngOnInit(): void {
    this.getFavoriteList();
  }

  async getFavoriteList() {
    const favorites: Favorite[] = this.favServ.getList();
    if (!favorites || favorites.length == 0) return (this.movies = []);

    this.isLoading = true;
    this.isError = false;

    try {
      const result = await this.movieServ.getDetailByArray(favorites);
      this.movies = result;
    } catch (error) {
      this.isError = true;
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  delete(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (!result.isConfirmed) return null;
      const res = this.favServ.delete(index);
      if (!res) return Swal.fire('Oops...', 'Something when wrong.', 'error');
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      this.getFavoriteList();
    });
  }

  move(index: number, destIndex: number) {
    const res = this.favServ.move(index, destIndex);
    if (!res)
      return this.notifServ.show('error', 'Result', 'Favorite failed to move');
    this.notifServ.show('success', 'Result', 'Favorite moved succesfully');
    this.getFavoriteList();
  }

  moveUp(index: number) {
    const destIndex = index - 1;
    this.move(index, destIndex);
  }

  moveDown(index: number) {
    const destIndex = index + 1;
    this.move(index, destIndex);
  }
}
