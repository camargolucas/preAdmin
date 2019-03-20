import { Usuario } from "src/app/model/user.model";
import { StorageService } from "../../services/storage.service";
import { UserService } from "./../../services/user.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import {PageEvent} from '@angular/material';

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
  arrUserAll;
  searchName;

  //#######################################################
  //Variavel que armazena o total de resultados encontrados
  totalItensBusca:number;
  //#######################################################

    // MatPaginator Inputs
    pageSize = 10;
    pageSizeOptions: number[] = [10];
    // MatPaginator Output
    pageEvent: PageEvent;
    activePageDataChunk = []
    displayedColumns: string[] = ['NOME', 'EMAIL', 'APELIDO', 'LOJA', 'ACTION'];
 
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
    this.arrUserAll = this.arrUser;
    //os dados são buscados no servidor e após receber a resposta os dados na tela
    //e o cache são atualizados.

    if(this.arrUser != undefined && this.arrUser != null){
      this.activePageDataChunk = this.arrUser.slice(0,this.pageSize);
    }

    try{
      this.totalItensBusca = this.arrUser.length;
    }catch(e){
    }

    await this.service.getUsers().then(result => {

      this.storageService.insertCacheUsersList(result);

      if(this.arrUser == null || this.arrUser == undefined){
        this.arrUser = result;
      }

    });
  }


  filterData(){
    this.arrUser = this.arrUserAll.filter(data => {
      return data.apelidoUsuario.toLowerCase().startsWith(this.searchName.toLowerCase());
    });
    this.totalItensBusca = this.arrUser.length;
    this.activePageDataChunk = this.arrUser.slice(0,this.pageSize);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.arrUser.slice(firstCut, secondCut);
  }







  editUser(user: Usuario) {
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
      if (result) {
        this.arrUser = result;
        this.activePageDataChunk = this.arrUser.slice(0,this.pageSize);
      }
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public storageService: StorageService
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
        this.storageService.updateClient(this.data).then(ret => {
          this.dialogRef.close(ret);
        });
        this.openSnackBar("Alterado com sucesso", "Fechar");
      } else {
        this.openSnackBar("Não foi possivel alterar", "Fechar");
      }
    });
  }

  updateUser(user: Usuario) {
    return this.service.updateUser(user);
  }
}
