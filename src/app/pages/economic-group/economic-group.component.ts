import { pipe } from '@angular/core/src/render3';
import { Component, OnInit } from '@angular/core';
import { EconomicGroupService } from 'src/app/services/economic-group.service';
import { StorageService } from "./../../services/storage.service";

@Component({
  selector: 'app-economic-group',
  templateUrl: './economic-group.component.html',
  styleUrls: ['./economic-group.component.css']
})
export class EconomicGroupComponent implements OnInit {

  arrEconominGroup;
  error;
  constructor(
    public service:EconomicGroupService,
    private storage: StorageService
    ) {}

  ngOnInit() {
    this.arrEconominGroup = this.storage.getAllDataEconomicGroup();
    this.getAllEconomicGroupData();
  }

  public getAllEconomicGroupData(){
    try{
      this.service.getEconomicGroupList().subscribe(data => {
          this.arrEconominGroup = data;
          this.storage.insertCacheEconomicGroup(data);
        }, error => {
          this.error = error
          console.log("ERRO AO BUSCAR DADOS");
        }
      );
    }catch(e){
      console.log(e);
    }
  }

  
}
