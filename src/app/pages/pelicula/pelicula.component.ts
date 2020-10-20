import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Cast } from '../../interfaces/credist-response'

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieDetails;
  public cast: Cast[] = [];
  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router ) { }

  ngOnInit(): void {

    const {id} = this.activatedRoute.snapshot.params;

    this.peliculasService.getPeliculaDetalles(id).subscribe( movie =>{
      if( !movie ){
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = movie;
    });

    this.peliculasService.getPeliculaCast(id).subscribe( cast =>{
      console.log(cast);
      this.cast = cast;
    })
  }


  reverse(){
    this.location.back();
  }

}
