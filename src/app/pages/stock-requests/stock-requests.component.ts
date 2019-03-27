import { StockRequestsService } from '../../services/stock-requests.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-stock-requests',
  templateUrl: './stock-requests.component.html',
  styleUrls: ['./stock-requests.component.css']
})
export class StockRequestsComponent implements OnInit {

  searchName:string;
  error:any;
  arrStockAll:any;
  arrStock:any;
  totalItensBusca:number;
  pageSize = 10;
  pageSizeOptions: number[] = [10];
  activePageDataChunk = []
  displayedColumns: string[] = ['COD', 'NOME', 'NOMEFANTASIA', 'TIPOCLIFORN'];

  constructor(
    public stockRequestsService:StockRequestsService,
    public storageService:StorageService
  ) {

    this.arrStockAll = this.storageService.getStockList();
    this.arrStock = this.arrStockAll;

    if(this.arrStock != undefined){
      this.activePageDataChunk = this.arrStock.slice(0,this.pageSize);
    }
    //#######################################################
    //variável que recebe o total de itens do resultado de busca
    //necessário para controlar e exibir mensagem de resultado
    //não encontrado
    try{
      this.totalItensBusca = this.arrStock.length;
    }catch(e){
    }
    //#######################################################
   }

  ngOnInit() {
    this.getStockList();
  }
  getStockList(){
    try{
      this.stockRequestsService.getStock().subscribe(data => {
        
          this.arrStockAll = data;

          if(this.arrStock == null || this.arrStock == undefined){
            this.arrStock = data;
           // this.activePageDataChunk = this.arrStock.slice(0,this.pageSize);
          }
          
          this.storageService.insertCacheStockList(data);

        }, error => {
          this.error = error
          console.log("ERRO AO BUSCAR DADOS");
        }
      );
    }catch(e){
      console.log(e);
    }

  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.arrStock.slice(firstCut, secondCut);
  }
}
