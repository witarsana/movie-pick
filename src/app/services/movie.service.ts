import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface FilterMovie {
  dateStart?: string;
  dateEnd?: string;
  sortBy?: string;
  statusSort?: 'asc' | 'desc';
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(filter: FilterMovie) {
    let url = `${environment.apiBaseUrl}/discover/movie?api_key=${environment.apiKey}&page=${filter.page}`;
    if (filter.sortBy) url += `&sort_by=${filter.sortBy}.${filter.statusSort}`;
    if (filter.dateStart)
      url += `&primary_release_date.gte=${filter.dateStart}&primary_release_date.lte=${filter.dateEnd}`;
    return this.http.get(url);
  }

  getMovie(id: number) {
    let url = `${environment.apiBaseUrl}/movie/${id}?api_key=${environment.apiKey}`;
    return this.http.get(url);
  }

  getDetailByArray(movies: any[]) {
    return new Promise(async (resolve, reject) => {
      let promiseArr = movies.map((mv) => {
        return this.getMovie(mv.id)
          .toPromise()
          .then((rs) => rs);
      });
      try {
        const res = await Promise.all(promiseArr);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}
