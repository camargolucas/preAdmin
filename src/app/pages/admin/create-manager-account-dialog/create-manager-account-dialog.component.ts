import { Component, OnInit, Inject } from '@angular/core';
//import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Usuario } from "src/app/model/user.model";
import { MatSnackBar } from "@angular/material";
import { UserService } from "./../../../services/user.service";
import { StorageService } from "../../../services/storage.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-manager-account-dialog',
  templateUrl: './create-manager-account-dialog.component.html',
  styleUrls: ['./create-manager-account-dialog.component.css']
})

export class CreateManagerAccountDialogComponent implements OnInit {

  email = new FormControl("", [Validators.required, Validators.email]);
  form;

  constructor(
    public snackBar: MatSnackBar,
    public service: UserService,
    public storageService: StorageService,
    public dialogRef: MatDialogRef<CreateManagerAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
    ) {



    }

  ngOnInit() {
  }
  onCloseConfirm() {
    this.dialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }
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
  createNewManagerAccount(){
    if(this.data.email != null && this.email.invalid == false){
      if(this.data.nomeUsuario != null && this.data.nomeUsuario != undefined && this.data.nomeUsuario.length > 0){
        if(this.data.apelidoUsuario != null && this.data.apelidoUsuario != undefined && this.data.apelidoUsuario.length > 0){

          this.createAccount(this.data).then(ret => {
            if (ret == 1) {
              this.service.getUsers().then(result => {
                this.storageService.insertCacheUsersList(result);
              });
                this.openSnackBar("Criado com sucesso", "Fechar");
                this.onNoClick();
                this.data.nomeUsuario = "";
                this.data.email = "";
                this.data.apelidoUsuario = "";
            } else {
              this.openSnackBar("Não foi possivel criar esta conta", "Fechar");
            }
          });

      }else{
        this.openSnackBar("Informe o Apelido do usuário", "Fechar");
      }
      }else{
        this.openSnackBar("Informe o Nome", "Fechar");
      }
    }else{
      this.openSnackBar("Informe um e-mail válido", "Fechar");
    }
  }
  createAccount(user: Usuario){
    return this.service.createNewManagerAccount(user);
  }



}
