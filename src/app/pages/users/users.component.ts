import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/model/user.model";
import { StorageService } from "../../services/storage.service";
import { UserService } from "./../../services/user.service";
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
  constructor(
    public service: UserService,
    private snackBar: MatSnackBar,
    public storageService: StorageService
  ) {
    this.user = new Usuario();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  async ngOnInit() {
    //primeiro buscamos dados no cache local para pré exibir os dados
    this.arrUser = this.storageService.getAllDataUserList();
    //os dados são buscados no servidor e após receber a resposta os dados na tela
    //e o cache são atualizados.
    await this.service.getUsers().then(result => {
      this.arrUser = result;
      this.storageService.insertCacheUsersList(result);
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
