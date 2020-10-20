import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  public texto: string = '';
  public movies: Movie[]=[];
  constructor( private activatedRoute: ActivatedRoute, 
               private peliculasService:PeliculasService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      console.log(params.texto);
      this.texto = params.texto;
      //lamar al servicio
      this.peliculasService.buscarPeliculas( params.texto ).subscribe( movies =>{
        console.log( movies );
        this.movies=movies;
      })

    })

  }

}
