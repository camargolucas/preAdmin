import { Main } from '../../class/main';
import { StorageService } from '../../services/storage.service';
import { Usuario } from '../../model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-default',
  templateUrl: './navbar-default.component.html',
  styleUrls: ['./navbar-default.component.css']
})
export class NavbarDefaultComponent implements OnInit {

  usuario:Usuario;
  userNome:string;
  userCargo:number;
  userGerente:boolean = true;
  userTiAdmin:boolean = false;

  constructor(private storage:StorageService,private main:Main) {
    this.main = new Main();
    this.usuario = new Usuario();
    this.usuario = this.storage.getAllDataLoggedUser();
   }

  ngOnInit() {

    try{

      this.userNome = this.usuario.nomeUsuario;

      if(this.usuario.idCargo == this.main.userAdmin){
        this.userTiAdmin = true;
      }


    }catch(e){
      console.log(e);
    }

  }


  goHome(){
    console.log("Go Home");
  }




}
