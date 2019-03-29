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

  dataResponsiveGridBodyHeight:number = 100;
  selectedRow = "row_";


  dataArrGrid = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
  dataArrGridColum = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100];
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

}
