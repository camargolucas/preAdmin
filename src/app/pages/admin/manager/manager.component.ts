import { BlockUserAccountDialogComponent } from './../../admin/block-user-account-dialog/block-user-account-dialog.component';
import { Usuario } from "src/app/model/user.model";
import { StorageService } from "../../../services/storage.service";
import { UserService } from "./../../../services/user.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import {PageEvent} from '@angular/material';
import {
  MatPaginator,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField
} from "@angular/material";
import { EditUserAccountDialogComponent } from '../edit-user-account-dialog/edit-user-account-dialog.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  arrUser;
  arrUserAll;
  searchName ="";
  paginaAtual:any = 1;
  pageIndex:any;

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
  displayedColumns: string[] = ['NOME', 'EMAIL', 'APELIDO', 'LOJA', 'ACTION'];
 
  public user: Usuario;

  public shouldShow = false;

  constructor(
    public dialog: MatDialog,
    public service: UserService,
    private snackBar: MatSnackBar,
    public storageService: StorageService
  ) { 
    this.user = new Usuario();
  }

  ngOnInit() {
    //primeiro buscamos dados no cache local para pré exibir os dados
    this.arrUser = this.storageService.getManagerList();
    this.arrUserAll = this.arrUser;
    //os dados são buscados no servidor e após receber a resposta os dados na tela
    //e o cache são atualizados.

    if(this.arrUser != undefined && this.arrUser != null){
      this.activePageDataChunk = this.arrUser.slice(0,this.pageSize);
    }

    try{
      this.totalItensBusca = this.arrUser.length;
    }catch(e){
    }

    this.service.getManagers().then(result => {
      this.storageService.insertCacheManagerList(result);
      if(this.arrUser == null || this.arrUser == undefined){
        this.arrUser = result;
      }
    });
  }


  filterData(){
    this.arrUser = this.arrUserAll.filter(data => {
      return data.apelidoUsuario.toLowerCase().startsWith(this.searchName.toLowerCase());
    });
    
    this.totalItensBusca = this.arrUser.length;
    this.activePageDataChunk = this.arrUser.slice(0,this.pageSize);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    this.pageIndex = e;
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.arrUser.slice(firstCut, secondCut);
  }
  changePage(){
    try {
      let firstCut = this.pageIndex.pageIndex * this.pageIndex.pageSize;
      let secondCut = firstCut + this.pageIndex.pageSize;
      this.activePageDataChunk = this.arrUser.slice(firstCut, secondCut);
      this.paginaAtual = this.pageIndex.pageIndex;    
    } catch (error) {
      console.log("Não foi possível mapear a página atual");
    }

  }
  blockUser(user: Usuario){
    this.openDialogBlockUser(user);
  }
  openDialogBlockUser(user: Usuario):void{
   
    
    //Necessário para atribur valor ao array de filtros
    const dialogRef = this.dialog.open(BlockUserAccountDialogComponent, {
      width: "400px",
      data: {
        email: user.email,
        nomeUsuario: user.nomeUsuario,
        apelidoUsuario: user.apelidoUsuario,
        loja: user.loja,
        idUsuario: user.idUsuario,
        ativo: user.ativo,
        idCargo: 2
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.arrUserAll = this.storageService.getManagerList();
      this.arrUser = this.arrUserAll;
      
      this.activePageDataChunk = this.arrUserAll.slice(0,this.pageSize);

      this.filterData();
      this.changePage();

    });
  }
  editUser(user: Usuario) {
    this.editUserOpenDialog(user);
  }


  editUserOpenDialog(user: Usuario): void {
    //Necessário para atribur valor ao array de filtros
    const dialogRef = this.dialog.open(EditUserAccountDialogComponent, {
      width: "400px",
      data: {
        email: user.email,
        nomeUsuario: user.nomeUsuario,
        apelidoUsuario: user.apelidoUsuario,
        loja: user.loja,
        idUsuario: user.idUsuario,
        ativo: user.ativo,
        idCargo: 2
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.arrUserAll = this.storageService.getManagerList();
      this.arrUser = this.arrUserAll;

      console.log(this.arrUserAll);
      
      this.activePageDataChunk = this.arrUserAll.slice(0,this.pageSize);
      this.filterData();
      this.changePage();

    });
  }





}
