import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage.service';
import { LoginService } from '../../services/login.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';

//A morte é uma parte natural da vida. 
//Feliz fique por aqueles que na Força se transformam. 
//Apego leva ao ciúmes, a sombra da ganância isso é.
//"Mestre Yoda"

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  //#######################################################
  //Usado para receber o status de login do usuário
  userLogged:boolean = false;
  //#######################################################

  //#######################################################
  //Array que vai conter os resultados da busca do usuário
  arrClientList:any;
  //#######################################################

  //#######################################################
  //Array que contém todos os registros da base, isso é usado para compor uma nova busca
  arrClientListAll:any;
  //#######################################################
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

    // MatPaginator Inputs
    pageSize = 10;
    pageSizeOptions: number[] = [10];
    // MatPaginator Output
    pageEvent: PageEvent;
    activePageDataChunk = []
    displayedColumns: string[] = ['COD', 'NOME', 'NOMEFANTASIA', 'TIPOCLIFORN'];

  constructor(
    private loginService:LoginService,
    private router: Router,
    private clientService:ClientService,
    private storageService:StorageService
    ) { 

    //#######################################################
    //Verificamos de o usuário esta logado, true para logado e false para não logado
    this.userLogged = loginService.checkIfUserIsLogged();
    //#######################################################

    //#######################################################
    //Busca a lista de clientes na API, ao receber os dados, 
    //atualiza a lista de dados no cache
    this.getAllClientData();
    //#######################################################

    //#######################################################
    //Resgata a lista de clientes no cache do usuário
    //esta variável irá conter os dados parciais dependendo
    //da busca do usuário por resultados
    this.arrClientList = storageService.getAllClientList();

    if(this.arrClientList != undefined){
      this.activePageDataChunk = this.arrClientList.slice(0,this.pageSize);
    }
    //#######################################################

    //#######################################################
    //Busca todos os dados da lista de clientes do cache, isso
    //serve como base para a busca subsequente pelo usuário
    this.arrClientListAll = this.arrClientList;
    //#######################################################

    //#######################################################
    //variável que recebe o total de itens do resultado de busca
    //necessário para controlar e exibir mensagem de resultado
    //não encontrado
    try{
      this.totalItensBusca = this.arrClientList.length;
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

  public getAllClientData(){
    try{
      this.clientService.getClientList().subscribe(data => {
        //###########################################################
          this.arrClientListAll = data;
         
          if(this.arrClientList == undefined){
            this.arrClientList = data;
            this.activePageDataChunk = this.arrClientList.slice(0,this.pageSize);
          }
        //###########################################################
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
  filterData(){
    this.arrClientList = this.arrClientListAll.filter(data => {
      return data.NOME
        .toLowerCase()
        .startsWith(this.searchName.toLowerCase());
    });
    this.totalItensBusca = this.arrClientList.length;
    this.activePageDataChunk = this.arrClientList.slice(0,this.pageSize);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.arrClientList.slice(firstCut, secondCut);
  }
}
