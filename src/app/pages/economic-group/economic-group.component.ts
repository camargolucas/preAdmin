import { pipe } from '@angular/core/src/render3';
import { Component, OnInit } from '@angular/core';
import { EconomicGroupService } from 'src/app/services/economic-group.service';
import { StorageService } from "./../../services/storage.service";
import { PagerService } from './../../services/pager.service';
import { LoginService } from '../../services/login.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-economic-group',
  templateUrl: './economic-group.component.html',
  styleUrls: ['./economic-group.component.css']
})
export class EconomicGroupComponent implements OnInit {

  //#######################################################
  //Usado para receber o status de login do usuário
  userLogged:boolean = false;
  //#######################################################

  arrEconominGroup;

  arrEconominGroupAll;

   //#######################################################
  //Variavel que recebe os erros reportados
  error:any;
  //#######################################################

  //#######################################################
  //Variavel que recebe a busca realizada pelo usuário
  searchName;
  //#######################################################

  //#######################################################
  //Variavel que armazena o total de resultados encontrados
  totalItensBusca:number;
  //#######################################################
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];


  constructor(
    private router: Router,
    private loginService:LoginService,
    public service:EconomicGroupService,
    private storage: StorageService,
    private paginationService:PagerService
    ) {
      this.arrEconominGroup = this.storage.getAllDataEconomicGroup();
      this.arrEconominGroupAll = this.storage.getAllDataEconomicGroup();
      this.getAllEconomicGroupData();
    //#######################################################
    //define a página atual para o serviço de paginação
    this.setPage(1);
    //#######################################################
    //#######################################################
    //Verificamos de o usuário esta logado, true para logado e false para não logado
    this.userLogged = loginService.checkIfUserIsLogged();
    //#######################################################

    //#######################################################
    //variável que recebe o total de itens do resultado de busca
    //necessário para controlar e exibir mensagem de resultado
    //não encontrado
    try{
      this.totalItensBusca = this.arrEconominGroup.length;
    }catch(e){
    }
    
    //#######################################################
    }

  ngOnInit() {
    //##############################################
    //Se o usuário não estiver logado, o 
    //sistema redireciona para a página de login
    if(!this.userLogged){
      this.router.navigateByUrl('/login');
    }
     //##############################################
  }

  public getAllEconomicGroupData(){
    try{
      this.service.getEconomicGroupList().subscribe(data => {
        
          this.arrEconominGroupAll = data;

          if(this.arrEconominGroup == null){
            this.arrEconominGroup = data;
          }
          
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

  filterData(){
    this.arrEconominGroup = this.arrEconominGroupAll.filter(data => {
      return data.nomeGrupoEconomicoCliente
        .toLowerCase()
        .startsWith(this.searchName.toLowerCase());
    });
    this.totalItensBusca = this.arrEconominGroup.length;
    this.setPage(1);
  }

  setPage(page: number) {
    try{
    // get pager object from service
    this.pager = this.paginationService.getPager(this.arrEconominGroup.length, page);
    // get current page of items
    this.pagedItems = this.arrEconominGroup.slice(this.pager.startIndex, this.pager.endIndex + 1);

    }catch(e){
      console.log(e);
    }
  }

  
}
