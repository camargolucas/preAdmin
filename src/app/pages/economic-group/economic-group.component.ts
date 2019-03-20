import { pipe } from '@angular/core/src/render3';
import { Component, OnInit } from '@angular/core';
import { EconomicGroupService } from 'src/app/services/economic-group.service';
import { StorageService } from "./../../services/storage.service";
import { PagerService } from './../../services/pager.service';
import { LoginService } from '../../services/login.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
//Guerras não faz grande ninguém. "Mestre Yoda"
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

  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  // MatPaginator Output
  pageEvent: PageEvent;
  activePageDataChunk = []
  displayedColumns: string[] = ['COD', 'NOME'];

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

      if(this.arrEconominGroup != undefined){
        this.activePageDataChunk = this.arrEconominGroup.slice(0,this.pageSize);
      }

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

          if(this.arrEconominGroup == null || this.arrEconominGroup == undefined){
            this.arrEconominGroup = data;
            this.activePageDataChunk = this.arrEconominGroup.slice(0,this.pageSize);
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
    this.activePageDataChunk = this.arrEconominGroup.slice(0,this.pageSize);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.arrEconominGroup.slice(firstCut, secondCut);
  }

  goDetails(id:any){
    this.router.navigate(['home/economic-group/'+id]);
  }

}
