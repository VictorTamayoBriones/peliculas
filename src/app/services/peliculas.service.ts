import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetails } from '../interfaces/movie-response';
import { CredistReonse } from '../interfaces/credist-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage  =1;
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params(){
    return{
      api_key: '7f6cb9a8e6ca3fe40e67dd7e10524f72',
      language: 'en-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]>{

    if( this.cargando ){
      return of([]) ;
    }

    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( ()=>{
        this.carteleraPage += 1;
        this.cargando = false; 
      })
    );
  }

  buscarPeliculas( texto:string ):Observable<Movie []>{

    const params = {...this.params, page: '1', query: texto};

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
       map( resp => resp.results )
    )
  }

  getPeliculaDetalles(id:string){
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
      params : this.params
    }).pipe(
      catchError( err => of(null) )
    )
  }
  
  getPeliculaCast(id:string){
    return this.http.get<CredistReonse>(`${this.baseUrl}/movie/${id}/credits`, {
      params : this.params
    }).pipe(
      map( response => response.cast ),
      catchError( err => of([]) )
    )
  }
}
