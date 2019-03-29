import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-list-requests-grid',
  templateUrl: './list-requests-grid.component.html',
  styleUrls: ['./list-requests-grid.component.css']
})
export class ListRequestsGridComponent implements OnInit {

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

  dataArrGrid = [
      {
        "id":1,
        "nome":"A abacate 1",
        "status":1,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"18,00"
      },{
        "id":2,
        "nome":"B abacate 2",
        "status":2,
        "tipo":"F",
        "unidmedida":"Kilo",
        "peso":"16,00"
      },{
        "id":3,
        "nome":"C abacate 3",
        "status":3,
        "tipo":"F",
        "unidmedida":"Bandeja",
        "peso":"15,00"
      },
      {
        "id":4,
        "nome":"D abacate 4",
        "status":4,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"14,00"
      },
      {
        "id":5,
        "nome":"X abacate 5",
        "status":1,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"13,00"
      },
      {
        "id":6,
        "nome":"F abacate 6",
        "status":2,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"28,00"
      },
      {
        "id":7,
        "nome":"G abacate 7",
        "status":3,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"100,00"
      },
      {
        "id":8,
        "nome":"H abacate 8",
        "status":4,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"7,00"
      },
      {
        "id":9,
        "nome":"I abacate 9",
        "status":1,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"54,00"
      },
      {
        "id":10,
        "nome":"J abacate 10",
        "status":2,
        "tipo":"F",
        "unidmedida":"Unidade",
        "peso":"167,00"
      }
  ];
  dataArrGridColum = [1,2,3,4,5,6,7,8,9,10];
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


}
