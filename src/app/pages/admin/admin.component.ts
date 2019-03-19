import { Router } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Usuario } from "src/app/model/user.model";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  usuario: Usuario; //Objeto usuário
  email: string = "";
  public shouldShow = false;

  constructor(private storage: StorageService, private router: Router) {
    this.usuario = new Usuario(); //Obtém a instância do Objeto Usuário
    this.usuario = this.storage.getAllDataLoggedUser(); //Busca os dados do usuário no Storage
  }

  ngOnInit() {
    //Verifica o cargo do usuário para permitir ou não o
    if (this.usuario.idCargo != 3) {
      this.router.navigateByUrl("/home");
    }
  }
}
