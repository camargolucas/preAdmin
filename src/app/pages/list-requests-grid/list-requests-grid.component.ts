import { Component, OnInit, HostListener } from '@angular/core';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material';
@Component({
  selector: 'app-list-requests-grid',
  templateUrl: './list-requests-grid.component.html',
  styleUrls: ['./list-requests-grid.component.css']
})
export class ListRequestsGridComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['after'];
  position = new FormControl(this.positionOptions[0]);
  //####################################################
  //Controle de altura do componente de listagem central
  screenHeight:number;
  screenWidth:number;

  //Status dos Pprodutos
  //1.Em evidencia
  //2.Em falta
  //3.Entre Safra
  //4.Neutro
  //Em evidencia, Em falta, Entre Safra, Neutro

  dataResponsiveGridBodyHeight:number = 100;
  selectedRow = "row_";

  arrOrder = "DESC";
  tabarrOrderSelected = "";


  //Elementos das Colunas

  dataArrGridColum = [
    {
      "loja": '1',
      "qtd":[1,15,6,87,918,39]
    },
    {
      "loja": '2',
      "qtd":[199,815,6,87,98,39]
    }
  ];

  dataArrGrid = [
      {
        "id":1,
        "nome":"A abacate 1 A abacate 1 A abacate 1",
        "status":1,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"18,00",
        "lojas":[5,6]
      },{
        "id":2,
        "nome":"B abacate 2",
        "status":2,
        "tipo":"F",
        "unidmedida":"Kilo",
        "peso":"16,00",
        "lojas":[15,62]
      },{
        "id":3,
        "nome":"C abacate 3",
        "status":3,
        "tipo":"F",
        "unidmedida":"Bandeja",
        "peso":"15,00",
        "lojas":[53,76]
      },
      {
        "id":4,
        "nome":"D abacate 4",
        "status":4,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"14,00",
        "lojas":[85,60]
      },
      {
        "id":5,
        "nome":"X abacate 5",
        "status":1,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"13,00",
        "lojas":[75,68]
      }
  ];

  //####################################################

  //####################################################
    //####################################################
    //Variáveis de controle do Painel

    totalVolumes:any = 0;
    valorTotalVendas:any = 0;
    valorTotalVendasComDesconto:any = 0;
    valorTotalCompra:any = 0;
    resultado:any = 0;
    margem:any = 0;

    //####################################################
  //####################################################

  constructor() { }

  ngOnInit() {
    this.getHeightWidthOnStart();
    this.totalVolumes = 850;
    this.valorTotalVendas = 1500;
    this.valorTotalVendasComDesconto = 2800;
    this.valorTotalCompra = 3.500;
    this.resultado = 4000;
    this.margem = '3%';

    //console.log("dataArrGrid : " + this.dataArrGrid[0].lojas[0].qtd);
  }

  onResize(event) {
    //######################################################
    //redimensiona a div central que contém os dados da Grid
    this.dataResponsiveGridBodyHeight = event.target.innerHeight - (91+167);
    //this.dataResponsiveGridBodyWidth = this.screenWidth - (510);
    //######################################################
  }

  @HostListener('window:resize', ['$event'])
    getHeightWidthOnStart(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;

      this.dataResponsiveGridBodyHeight = this.screenHeight - (91+167);
    }

    @HostListener('window:scroll', ['$event']) // for window scroll events
      onScroll(event) {
        document.getElementById('dataResponsiveGridShowRight').scrollLeft = event.srcElement.scrollLeft;
        document.getElementById('gridTableDataLeftContainer').scrollTop = event.srcElement.scrollTop;
        
     }
    highlightRow(row:any){
      this.selectedRow = row;
    }
    orderDataArrGrid(attribute:any){

      console.log("attribute : " + attribute);

      this.setTabarrOrderSelected(attribute);
      
      if(this.arrOrder == 'ASC'){
        this.dataArrGrid = this.sortByKeyASC(this.dataArrGrid, attribute);
        this.arrOrder = 'DESC';
      }else{
        this.dataArrGrid = this.sortByKeyDESC(this.dataArrGrid, attribute);
        this.arrOrder = 'ASC';
      }

    }

  sortByKeyASC(array, key) {
      return array.sort(function(a, b) {
          var x = a[key]; 
          var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
  }

  sortByKeyDESC(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; 
        var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }
  setTabarrOrderSelected(tab:any){
    this.tabarrOrderSelected = tab;
  }


  getTotalItens(index:any){

    let total = 0;
    for(let i = 0; i< this.dataArrGrid[index].lojas.length;i++){
      total = total + this.dataArrGrid[index].lojas[i];
    }

    return total;
  }
}
