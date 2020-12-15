import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Favorite {
  id: number;
  date: number;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private sourceList = new BehaviorSubject<Favorite[]>(null);
  favoriteList = this.sourceList.asObservable();

  constructor() {
    const list = this.getList();
    this.updateSource(list);
  }

  updateSource(list: Favorite[]) {
    this.sourceList.next(list);
  }

  getList(): Favorite[] {
    return JSON.parse(localStorage.getItem('FAVORITES'));
  }

  get(id) {
    const favorites: Favorite[] = this.getList() || [];
    return favorites.find((fav) => (fav.id = id)) || null;
  }

  checkExist(id) {
    const favorites: Favorite[] = this.getList() || [];
    const favorite = favorites.find((fav) => fav.id == id) || null;
    if (favorite) return true;
    return false;
  }

  add(favorite: Favorite) {
    let favorites: Favorite[] = this.getList() || [];
    favorites.push(favorite);
    localStorage.setItem('FAVORITES', JSON.stringify(favorites));
    this.updateSource(favorites);
    return favorite;
  }

  delete(index) {
    let favorites: Favorite[] = this.getList() || [];
    favorites.splice(index, 1);
    localStorage.setItem('FAVORITES', JSON.stringify(favorites));
    this.updateSource(favorites);
    return favorites;
  }

  move(curentIndex: number, newIndex: number) {
    let favorites: Favorite[] = this.getList() || [];
    let newFavorites: Favorite[] = [];
    const homeItem = favorites[newIndex];
    const guestItem = favorites[curentIndex];
    favorites.forEach((fav, idx) => {
      if (idx == curentIndex) newFavorites.push(homeItem);
      else if (idx == newIndex) newFavorites.push(guestItem);
      else newFavorites.push(fav);
    });

    localStorage.setItem('FAVORITES', JSON.stringify(newFavorites));
    this.updateSource(newFavorites);
    return newFavorites;
  }
}
