import { Usuario } from "src/app/model/user.model";
import { StorageService } from "../../services/storage.service";
import { UserService } from "./../../services/user.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField
} from "@angular/material";

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
    public dialog: MatDialog,
    public service: UserService,
    private snackBar: MatSnackBar,
    public storageService: StorageService
  ) {
    this.user = new Usuario();
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
    /*     this.user = new Usuario();

    this.user.email = user.email;
    this.user.nomeUsuario = user.nomeUsuario;
    this.user.apelidoUsuario = user.apelidoUsuario;
    this.user.loja = user.loja;
    this.user.idUsuario = user.idUsuario;
 */
    this.openDialog(user);
  }

  openDialog(user: Usuario): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "400px",
      data: {
        email: user.email,
        nomeUsuario: user.nomeUsuario,
        apelidoUsuario: user.apelidoUsuario,
        loja: user.loja,
        idUsuario: user.idUsuario
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
    });
  }
}
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "user-dialog.html",
  styleUrls: ["./users.component.css"]
})
export class DialogOverviewExampleDialog {
  email = new FormControl("", [Validators.required, Validators.email]);

  constructor(
    public snackBar: MatSnackBar,
    public service: UserService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getErrorMessage() {
    return this.email.hasError("required")
      ? "Preencha este campo"
      : this.email.hasError("email")
      ? "Email não é válido"
      : "";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  update(user: Usuario) {
    this.updateUser(user).then(ret => {
      if (ret == 1) {
        this.openSnackBar("Alterado com sucesso", "Fechar");
        this.dialogRef.close();
      } else {
        this.openSnackBar("Não foi possivel alterar", "Fechar");
      }
    });
  }

  updateUser(user: Usuario) {
    return this.service.updateUser(user);
  }
}
