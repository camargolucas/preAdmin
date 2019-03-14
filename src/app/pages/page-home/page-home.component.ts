import { StorageService } from './../../services/storage.service';
import { Usuario } from './../../model/user.model';
import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  userLogged:boolean = false;
  usuario:Usuario;

  constructor(private loginService:LoginService, private router: Router,private storage:StorageService) { 
    
    this.userLogged = loginService.checkIfUserIsLogged();

    if(this.userLogged){
      this.usuario = new Usuario();
      this.usuario = this.storage.getAllDataLoggedUser();
    }

  }


  ngOnInit() {
    if(!this.userLogged){
        this.router.navigateByUrl('/login');
    }
  }

  signOutUser(){
    if(this.loginService.signOutUser()){
      this.router.navigateByUrl('/login');
    }
  }
}
