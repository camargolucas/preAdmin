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

  constructor(private loginService:LoginService, private router: Router,) { 
    this.userLogged = loginService.checkIfUserIsLogged();
  }


  ngOnInit() {
    if(!this.userLogged){
        this.router.navigateByUrl('/home/login');
    }




    
  }

  signOutUser(){
    if(this.loginService.signOutUser()){
      this.router.navigateByUrl('/login');
    }
  }
}
