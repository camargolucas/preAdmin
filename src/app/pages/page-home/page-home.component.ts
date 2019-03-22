import { Main } from './../../../../.history/src/app/class/main_20190314112749';
import { StorageService } from './../../services/storage.service';
import { Usuario } from './../../model/user.model';
import { LoginService } from '../../services/login.service';
import { Component, OnInit, Renderer } from '@angular/core';
import {Router} from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { Title } from '@angular/platform-browser';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  userLogged:boolean = false;
  public userTiAdmin:boolean = false;
  usuario:Usuario;
  mode = new FormControl('side');
   //#######################################################
  //itemMenu utilizado para manipular os itens do menu
  itemMenu = 1;
  //#######################################################
  
  constructor(
    private titleService:Title,
    private loginService:LoginService, 
    private router: Router,
    private storage:StorageService,
    private renderer:Renderer,
    private main:Main
    ) { 
    
    this.userLogged = loginService.checkIfUserIsLogged();

    if(this.userLogged){
      this.usuario = new Usuario();
      this.usuario = this.storage.getAllDataLoggedUser();

    }

  }

  ngOnInit() {
    this.titleService.setTitle('Painel de controle');
    if(!this.userLogged){
        this.router.navigateByUrl('/login');
    }

    if(this.usuario.idCargo == this.main.userAdmin){
      this.userTiAdmin = true;
      //Se o usuário é da equipe de Ti ele possui privilégos administrativos
    }
    
  }
  signOutUser(){
    if(this.loginService.signOutUser()){
      this.router.navigateByUrl('/login');
    }
  }
  changeClass(event:any){
    this.renderer.setElementClass(event.target,"active",true);
  }

  //#######################################################
  //Método que altera o valor do id do item clicado no menu
  addClass(id: any){
    this.itemMenu = id;
  }
  //#######################################################
  //#######################################################
}
