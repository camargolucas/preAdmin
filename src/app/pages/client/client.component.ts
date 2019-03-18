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
  

  constructor(
    private loginService:LoginService,
    private router: Router,
    private clientService:ClientService,
    private storageService:StorageService
    ) { 
    this.userLogged = loginService.checkIfUserIsLogged();
    this.getAllClientData();
    this.arrClientList = storageService.getAllClientList();
  }

  ngOnInit() {
    if(!this.userLogged){
      this.router.navigateByUrl('/login');
    }
  }


  public getAllClientData(){
    try{
      this.clientService.getClientList().subscribe(data => {
          this.arrClientList = data;
          this.storageService.insertCacheClientList(data);
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
