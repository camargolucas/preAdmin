import { LoginService } from './../../services/login.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email:string;
  
  constructor(private titleService:Title, private loginService: LoginService) { }

  ngOnInit() {
    this.setTitle("Login");
    this.loginUser();
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }


  public loginUser(){

    this.loginService
    .loginAutentication("lukao@zica", "12345", "thiago")
    .subscribe( data => {

      if(data['status'] == 'success'){

        console.log("data 2: " + data['status']);
        console.log("data : " + data['userData'][0]['idUsuario']);

      }else{
          console.log("Erro ao fazer login");
      }


  });
  }




}
