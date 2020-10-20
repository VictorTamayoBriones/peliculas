import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieDetails;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location ) { }

  ngOnInit(): void {

    const {id} = this.activatedRoute.snapshot.params;

    this.peliculasService.getPeliculaDetalles(id).subscribe( movie =>{
      console.log(movie);
      this.pelicula = movie;
    })
  }

  onRegresar(){
    this.location.back();
  }

}
