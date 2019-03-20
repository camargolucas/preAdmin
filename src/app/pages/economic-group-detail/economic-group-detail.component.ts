import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {PageEvent} from '@angular/material';
import { ClientService } from './../../services/client.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-economic-group-detail',
  templateUrl: './economic-group-detail.component.html',
  styleUrls: ['./economic-group-detail.component.css']
})

export class EconomicGroupDetailComponent implements OnInit {

  //#######################################################
  //Usado para receber o status de login do usuário
  userLogged:boolean = false;
  //#######################################################

  idEconomicGroup: number;
  nomeEconomicGroup: string = "NOME DO GRUPO ECONÔMICO";
  private sub: any;

  error:any;

  arrEconomicGroupClient;
  arrEconomicGroupClientAll;

  //#######################################################
  //Variavel que recebe a busca realizada pelo usuário
  searchName;
  //#######################################################
  //#######################################################
  //Variavel que armazena o total de resultados encontrados
  totalItensBusca:number;
  //#######################################################
  // MatPaginator Inputs
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  // MatPaginator Output
  pageEvent: PageEvent;
  activePageDataChunk = []
  displayedColumns: string[] = ['COD', 'NOME'];

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private loginService:LoginService,
    private clientService:ClientService,
    private storageService:StorageService) {

    //#######################################################
    //Verificamos de o usuário esta logado, true para logado e false para não logado
    this.userLogged = loginService.checkIfUserIsLogged();
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
    this.sub = this.route.params.subscribe(params => {
      this.idEconomicGroup = + params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.


    //#######################################################
    //Resgata a lista de clientes no cache do usuário
    //esta variável irá conter os dados parciais dependendo
    //da busca do usuário por resultados
    this.arrEconomicGroupClient = this.storageService.getAllEconomicGroupClientList(this.idEconomicGroup);
    //#######################################################
    //Busca todos os dados da lista de clientes do cache, isso
    //serve como base para a busca subsequente pelo usuário
    this.arrEconomicGroupClientAll = this.arrEconomicGroupClient;
    //#######################################################

    if(this.arrEconomicGroupClient != undefined){
      this.activePageDataChunk = this.arrEconomicGroupClient.slice(0,this.pageSize);
    }
    //#######################################################

    //#######################################################
    //variável que recebe o total de itens do resultado de busca
    //necessário para controlar e exibir mensagem de resultado
    //não encontrado
    try{
      this.totalItensBusca = this.arrEconomicGroupClient.length;
    }catch(e){
    }
    //#######################################################


   });


   this.getAllClientData();


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  public getAllClientData(){
    try{
      this.clientService.getClientList().subscribe(data => {
        this.storageService.insertCacheClientList(data);
        //###########################################################
          //this.arrEconomicGroupClientAll = data;
         
          if(this.arrEconomicGroupClient == undefined || this.arrEconomicGroupClient == null){

          
          //#######################################################
          //Resgata a lista de clientes no cache do usuário
          //esta variável irá conter os dados parciais dependendo
          //da busca do usuário por resultados
          this.arrEconomicGroupClient = this.storageService.getAllEconomicGroupClientList(this.idEconomicGroup);
          //#######################################################
          //Busca todos os dados da lista de clientes do cache, isso
          //serve como base para a busca subsequente pelo usuário
          this.arrEconomicGroupClientAll = this.arrEconomicGroupClient;
          //#######################################################

            this.activePageDataChunk = this.arrEconomicGroupClient.slice(0,this.pageSize);
          
          //#######################################################
          
            //#######################################################
            //variável que recebe o total de itens do resultado de busca
            //necessário para controlar e exibir mensagem de resultado
            //não encontrado
            try{
              this.totalItensBusca = this.arrEconomicGroupClient.length;
            }catch(e){
            }
            //#######################################################
          
          }
        //###########################################################
          
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
    this.arrEconomicGroupClient = this.arrEconomicGroupClientAll.filter(data => {
      return data.NOME.toLowerCase().startsWith(this.searchName.toLowerCase());
    });

    this.totalItensBusca = this.arrEconomicGroupClient.length;
    this.activePageDataChunk = this.arrEconomicGroupClient.slice(0,this.pageSize);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.arrEconomicGroupClient.slice(firstCut, secondCut);
  }






}