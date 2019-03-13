import { StorageService } from './../../services/storage.service';
import { LoginService } from './../../services/login.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userEmail = new FormControl('', [Validators.required, Validators.email]);
  private userSenha = new FormControl('', Validators.required);
  private UUID:string;

  errologin:boolean = false;
  emptyPassword:boolean = false;
  emptyEmail:boolean = false;
  loginSendData:boolean = false;
  navigatorStorageCompatibility:boolean = true;
  userLogged:boolean = false;

  constructor(
    private titleService:Title, 
    private loginService: LoginService, 
    private router: Router,
    private storage:StorageService
    ) { 
      this.userLogged = loginService.checkIfUserIsLogged();
    }

  ngOnInit() {

    this.setTitle("Login");
    
    if(this.userLogged){
        this.router.navigateByUrl('/home');
    }

  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  public loginUser(){
    this.UUID = "thiago";
    //"lukao@zica", "12345", "thiago"
    if(this.userEmail.value.length > 0){
      if(this.userSenha.value.length > 0){

          this.loginSendData = true;

          this.loginService
          .loginAutentication(this.userEmail.value, this.userSenha.value, this.UUID)
          .subscribe( data => {
            if(data['status'] == 'success'){
              if(this.storage.insertDataLogedUser(data)){
                this.router.navigateByUrl('/home');
              }else{
                this.navigatorStorageCompatibility = false;
              }
            }else{
                this.loginSendData = false;
                this.errologin = true;
            }
        });
      }else{
        this.loginSendData = false;
        this.emptyPassword = true;
      }
    }else{
      this.loginSendData = false;
      this.emptyEmail = true;
    }
  }
}
