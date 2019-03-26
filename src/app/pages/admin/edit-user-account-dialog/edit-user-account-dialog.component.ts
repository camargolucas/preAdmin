import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators, } from "@angular/forms";
import {PageEvent} from '@angular/material';
import { Usuario } from "src/app/model/user.model";
import { StorageService } from "../../../services/storage.service";
import { UserService } from "./../../../services/user.service";

import {
  MatPaginator,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField
} from "@angular/material";

@Component({
  selector: 'app-edit-user-account-dialog',
  templateUrl: './edit-user-account-dialog.component.html',
  styleUrls: ['./edit-user-account-dialog.component.css']
})
export class EditUserAccountDialogComponent implements OnInit {

  email = new FormControl("", [Validators.required, Validators.email]);
  
  constructor(
    public snackBar: MatSnackBar,
    public service: UserService,
    public dialogRef: MatDialogRef<EditUserAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public storageService: StorageService
  ) {}

  ngOnInit() {
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
