import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

  public movies: Movie[]=[];
  public moviesSilideshow: Movie[]=[]

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( pos > max ){
      this.peliculasService.getCartelera().subscribe( movies=>{
        this.movies.push(...movies);
      });
    }
  }

  constructor( private peliculasService: PeliculasService ) { }

  ngOnInit(): void {

    this.peliculasService.getCartelera()
        .subscribe( movies=>{
          this.movies = movies;
          this.moviesSilideshow = movies;
        })
  }

  ngOnDestroy(){
    this.peliculasService.resetCarteleraPage();
  }

}
