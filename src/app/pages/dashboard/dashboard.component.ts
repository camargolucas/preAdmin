import { EconomicGroupService } from '../../services/economic-group.service';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { CreateUserAccountDialogComponent } from '../admin/create-user-account-dialog/create-user-account-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField,
} from "@angular/material";
import { Usuario } from "src/app/model/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalGrupoEconomico:string = "0";
  totalUser:any = "0";
  usuario: Usuario;

  constructor(
    public storageService:StorageService,
    public userService:UserService,
    public serviceEconomicGroup:EconomicGroupService,
    public dialog: MatDialog
    ) {

      this.loadDataDashboard();
  }

  ngOnInit() {
    try{
      this.totalGrupoEconomico = this.storageService.getTotalEconomicGroup();
    }catch(e){

    }
  }

  loadDataDashboard(){

    this.userService.getUsers().then(result => {
      this.storageService.insertCacheUsersList(result);
      this.totalUser = this.storageService.getTotalUsers();
    });

    this.serviceEconomicGroup.getEconomicGroupList().subscribe(data => {
      this.storageService.insertCacheEconomicGroup(data);
      this.totalGrupoEconomico = this.storageService.getTotalEconomicGroup();
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
