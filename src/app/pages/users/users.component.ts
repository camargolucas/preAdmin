import { Usuario } from "src/app/model/user.model";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  arrUser;
  arr = [];
  searchName;
  public user: Usuario;

  public shouldShow = false;
  constructor(public service: UserService, private snackBar: MatSnackBar) {
    this.user = new Usuario();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  async ngOnInit() {
    await this.service.getUsers().then(result => {
      this.arrUser = result;
    });
  }

  editUser(user: Usuario) {
    this.user = new Usuario();

    this.user.email = user.email;
    this.user.nomeUsuario = user.nomeUsuario;
    this.user.apelidoUsuario = user.apelidoUsuario;
    this.user.loja = user.loja;
    this.user.idUsuario = user.idUsuario;

    this.shouldShow = true;
  }

  update(user: Usuario) {
    this.updateUser(user).then(ret => {
      if (ret == 1) {
        this.openSnackBar("Alterado com sucesso", "Fechar");
        this.shouldShow = false;
      } else {
        this.openSnackBar("Não foi possivel alterar", "Fechar");
      }
    });
  }

  updateUser(user: Usuario) {
    return this.service.updateUser(user);
  }
}
