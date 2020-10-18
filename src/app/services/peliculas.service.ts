import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage  =1;

  constructor( private http: HttpClient ) { }

  get params(){
    return{
      api_key: '7f6cb9a8e6ca3fe40e67dd7e10524f72',
      language: 'en-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<CarteleraResponse>{

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
      params: this.params
    }).pipe(
      tap( ()=>{
        this.carteleraPage += 1;
      })
    );
  }
}
