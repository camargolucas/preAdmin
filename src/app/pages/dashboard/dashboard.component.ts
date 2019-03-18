import { EconomicGroupService } from '../../services/economic-group.service';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalGrupoEconomico:string = "0";
  totalUser:any = "0";

  constructor(
    public storageService:StorageService,
    public userService:UserService,
    public serviceEconomicGroup:EconomicGroupService
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

}
