import { Router } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { Component, OnInit, Inject} from "@angular/core";
import { Usuario } from "src/app/model/user.model";
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "./../../services/user.service";
import { CreateManagerAccountDialogComponent } from './create-manager-account-dialog/create-manager-account-dialog.component';
import { CreateUserAccountDialogComponent } from './create-user-account-dialog/create-user-account-dialog.component';

import {PageEvent} from '@angular/material';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField,
} from "@angular/material";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  
  usuario: Usuario; //Objeto usuário
  manager: any;
  email: string = "";
  
  public shouldShow = false;

  name: string;
  
  totalUsers:any = 0;
  totalManager:any = 0;

  constructor(
    private storage: StorageService, 
    public router: Router,
    public dialog: MatDialog,
    public service: UserService,
    private snackBar: MatSnackBar,
    ) {
    this.manager = new Usuario();
    this.usuario = new Usuario(); //Obtém a instância do Objeto Usuário
    this.usuario = this.storage.getAllDataLoggedUser(); //Busca os dados do usuário no Storage
    this.manager = this.storage.getManagerList();
    this.totalManager = this.storage.getTotalManagerList();
    
    this.totalUsers = service.getTotalUsers();
  }

  ngOnInit() {
    this.service.getManagers();
    //Verifica o cargo do usuário para permitir ou não o
    if (this.usuario.idCargo != 3) {
      this.router.navigateByUrl("/home");
    }

    this.service.getManagers().then(result => {
      this.storage.insertCacheManagerList(result);
      if(this.manager == null || this.manager == undefined){
        this.manager = result;
        this.totalManager = this.storage.getTotalManagerList();
      }

    });
  }
  createNewManagerAccount():void{
    let dialogRef = this.dialog.open(CreateManagerAccountDialogComponent, {
      width: '400px',
      data: this.usuario
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
    });
  }
  createNewUserAccount():void{
    let dialogRef = this.dialog.open(CreateUserAccountDialogComponent, {
      width: '400px',
      data: this.usuario
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
    });
  }





}