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

  //Status dos Produtos
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
  dataArrGridColum = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,3,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

  dataArrGrid = [
      {
        "id":1,
        "nome":"A abacate 1 A abacate 1 A abacate 1",
        "status":1,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"18,00",
        "precoVenda": "10.20",
        "precoUnitario":"5.00",
        "precoCusto": "5.20",
        "fornecedor":"Valinhos",
        "lojas":[55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      },{
        "id":2,
        "nome":"B abacate 2",
        "status":2,
        "tipo":"F",
        "unidmedida":"Kilo",
        "peso":"16,00",
        "precoVenda": "10.20",
        "precoUnitario":"5.00",
        "precoCusto": "5.20",
        "fornecedor":"Valinhos",
        "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      },{
        "id":3,
        "nome":"C abacate 3",
        "status":3,
        "tipo":"F",
        "unidmedida":"Bandeja",
        "peso":"15,00",
        "precoVenda": "10.20",
        "precoUnitario":"5.00",
        "precoCusto": "5.20",
        "fornecedor":"Valinhos",
        "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      },
      {
        "id":4,
        "nome":"D abacate 4",
        "status":4,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"14,00",
        "precoVenda": "10.20",
        "precoUnitario":"5.00",
        "precoCusto": "5.20",
        "fornecedor":"Valinhos",
        "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      },
      {
        "id":5,
        "nome":"X abacate 5",
        "status":1,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"13,00",
        "precoVenda": "10.20",
        "precoUnitario":"5.00",
        "precoCusto": "5.20",
        "fornecedor":"Valinhos",
        "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }
  ];

  dataArrGridTemp = [
    {
      "id":1,
      "nome":"A abacate 1 A abacate 1 A abacate 1",
      "status":1,
      "tipo":"F",
      "unidmedida":"Unidade",
      "peso":"18,00",
      "precoVenda": "10.20",
      "precoUnitario":"5.00",
      "precoCusto": "5.20",
      "fornecedor":"Valinhos",
      "lojas":[55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      "id":2,
      "nome":"B abacate 2",
      "status":2,
      "tipo":"F",
      "unidmedida":"Kilo",
      "peso":"16,00",
      "precoVenda": "10.20",
      "precoUnitario":"5.00",
      "precoCusto": "5.20",
      "fornecedor":"Valinhos",
      "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },{
      "id":3,
      "nome":"C abacate 3",
      "status":3,
      "tipo":"F",
      "unidmedida":"Bandeja",
      "peso":"15,00",
      "precoVenda": "10.20",
      "precoUnitario":"5.00",
      "precoCusto": "5.20",
      "fornecedor":"Valinhos",
      "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      "id":4,
      "nome":"D abacate 4",
      "status":4,
      "tipo":"F",
      "unidmedida":"Unidade",
      "peso":"14,00",
      "precoVenda": "10.20",
      "precoUnitario":"5.00",
      "precoCusto": "5.20",
      "fornecedor":"Valinhos",
      "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      "id":5,
      "nome":"X abacate 5",
      "status":1,
      "tipo":"F",
      "unidmedida":"Unidade",
      "peso":"13,00",
      "precoVenda": "10.20",
      "precoUnitario":"5.00",
      "precoCusto": "5.20",
      "fornecedor":"Valinhos",
      "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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

  constructor() {

   }

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
        this.dataArrGridTemp = this.sortByKeyASC(this.dataArrGridTemp, attribute);
        this.arrOrder = 'DESC';
      }else{
        this.dataArrGrid = this.sortByKeyDESC(this.dataArrGrid, attribute);
        this.dataArrGridTemp = this.sortByKeyDESC(this.dataArrGridTemp, attribute);
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
    
    for(let i = 0; i< this.dataArrGridTemp[index].lojas.length;i++){

      let d = this.dataArrGridTemp[index].lojas[i];

      total += Number(d);
    }

    return total;
  }


  setDataCell(data:any, lineIndex:any, columnIndex:any){

    console.log("lineIndex : " + lineIndex);
    console.log("columnIndex : " + columnIndex);
    this.dataArrGridTemp[lineIndex].lojas[columnIndex] = data;

 //  dataArrGridTemp = this.dataArrGrid;
    
    
  }


}
