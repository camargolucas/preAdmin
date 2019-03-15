import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Usuario } from 'src/app/model/user.model';

@Component({
  selector: 'app-gerentes',
  templateUrl: './gerentes.component.html',
  styleUrls: ['./gerentes.component.css']
})
export class GerentesComponent implements OnInit {

  usuario:Usuario;//Objeto usuário

  constructor(
    private storage:StorageService,
    private router:Router
  ) {
    this.usuario = new Usuario();//Obtém a instância do Objeto Usuário
    this.usuario = this.storage.getAllDataLoggedUser();//Busca os dados do usuário no Storage
  
  }

  ngOnInit() {
    //Verifica o cargo do usuário para permitir ou não o
    if(this.usuario.idCargo != 3){
      this.router.navigateByUrl("/home");
    }
  }

}
