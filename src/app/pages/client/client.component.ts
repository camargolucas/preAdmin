import { PagerService } from './../../services/pager.service';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage.service';
import { LoginService } from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  userLogged:boolean = false;
  arrClientList:any;
  error:any;
  searchName;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private loginService:LoginService,
    private router: Router,
    private clientService:ClientService,
    private storageService:StorageService,
    private paginationService:PagerService
    ) { 
    this.userLogged = loginService.checkIfUserIsLogged();
    this.getAllClientData();
    this.arrClientList = storageService.getAllClientList();
    this.setPage(1);
  }

  ngOnInit() {
    if(!this.userLogged){
      this.router.navigateByUrl('/login');
    }
  }


  public getAllClientData(){

    try{
      this.clientService.getClientList().subscribe(data => {

        //console.log("this.arrClientList.length : " + this.arrClientList);
        if(this.arrClientList ==null){
            this.arrClientList = data;
        }
        
          this.storageService.insertCacheClientList(data);
          this.setPage(1);
        }, error => {
          this.error = error
          console.log("ERRO AO BUSCAR DADOS");
        }
      );
    }catch(e){
      console.log(e);
    }

  }

  setPage(page: number) {
    try{
    // get pager object from service
    this.pager = this.paginationService.getPager(this.arrClientList.length, page);
    // get current page of items
    this.pagedItems = this.arrClientList.slice(this.pager.startIndex, this.pager.endIndex + 1);
 
    }catch(e){
      console.log(e);
    }

  }

}
