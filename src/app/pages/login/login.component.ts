import { StorageService } from "./../../services/storage.service";
import { LoginService } from "./../../services/login.service";
import { Title } from "@angular/platform-browser";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public userEmail = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  public userSenha = new FormControl("", Validators.required);
  public UUID: string;

  errologin: boolean = false;
  emptyPassword: boolean = false;
  emptyEmail: boolean = false;
  loginSendData: boolean = false; //Variavel usada para mostrar ou não o progressbar
  navigatorStorageCompatibility: boolean = true;
  userLogged: boolean = false;

  constructor(
    private titleService: Title,
    private loginService: LoginService,
    private router: Router,
    private storage: StorageService
  ) {
    //verifica se usuário esta logado, caso esteja logado a variavel recebe TRUE do método
    //loginService.checkIfUserIsLogged();
    this.userLogged = loginService.checkIfUserIsLogged();
  }

  ngOnInit() {
    //Define o titulo da página
    this.setTitle("Login");

    //Verifica se o usuário esta logado
    //Caso esteja ele é redirecionado a página Home
    if (this.userLogged) {
      this.router.navigateByUrl("/home");
    }
  }
  //Funçãi para definir o Titulo da página
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  //Função de login do usuário
  public loginUser() {
    //ID unico do dispositivo, provavelmente não será usado neste cliente
    this.UUID = "thiago";
    //"lukao@zica", "12345", "thiago"
    //Validação Basica se o email ou senha esta vazio
    if (this.userEmail.value.length > 0) {
      if (this.userSenha.value.length > 0) {
        this.loginSendData = true; //Variavel usada para mostrar ou não o progressbar

        this.loginService
          .loginAutentication(
            this.userEmail.value,
            this.userSenha.value,
            this.UUID
          )
          .subscribe(data => {
            if (data["status"] == "success") {
              if (this.storage.insertDataLogedUser(data)) {
                this.router.navigateByUrl("/home");
              } else {
                this.navigatorStorageCompatibility = false;
              }
            } else {
              this.loginSendData = false; //Variavel usada para mostrar ou não o progressbar
              this.errologin = true;
            }
          });
      } else {
        this.loginSendData = false; //Variavel usada para mostrar ou não o progressbar
        this.emptyPassword = true;
      }
    } else {
      this.loginSendData = false; //Variavel usada para mostrar ou não o progressbar
      this.emptyEmail = true;
    }
  }
}
