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

  usuario:Usuario;//Objeto usuário
  userNome:string;
  userCargo:number;
  userGerente:boolean = true;
  userTiAdmin:boolean = false;
  //#######################################################
  //itemMenu utilizado para manipular os itens do menu
  itemMenu = 1;
  //#######################################################
  constructor(private storage:StorageService,private main:Main) {
    this.main = new Main();//Obtém a instância da classe Main
    this.usuario = new Usuario();//Obtém a instância do Objeto Usuário
    this.usuario = this.storage.getAllDataLoggedUser();//Busca os dados do usuário no Storage
   }

  ngOnInit() {
    try{
      //Define o valor do nome de usuário
      this.userNome = this.usuario.nomeUsuario;
      //verifica o cargo do usuário logado
      if(this.usuario.idCargo == this.main.userAdmin){
        this.userTiAdmin = true;
        //Se o usuário é da equipe de Ti ele possui privilégos administrativos
      }
    }catch(e){
      console.log(e);
    }

  }
  //#######################################################
  //Método que altera o valor do id do item clicado no menu
  addClass(id: any){
    this.itemMenu = id;
  }
  //#######################################################
  //#######################################################
}
