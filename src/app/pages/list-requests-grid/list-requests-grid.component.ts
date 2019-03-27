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
  dataResponsiveGridBodyWidth:number = 100;

  dataArrGrid = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20, 21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]

  //####################################################

  constructor() { }

  ngOnInit() {
    this.getHeightWidthOnStart();
  }

  onResize(event) {
    //######################################################
    //redimensiona a div central que contém os dados da Grid
    this.dataResponsiveGridBodyHeight = event.target.innerHeight - (91+172);
    this.dataResponsiveGridBodyWidth = this.screenWidth - (510);
    //######################################################
  }



  @HostListener('window:resize', ['$event'])
    getHeightWidthOnStart(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;

      this.dataResponsiveGridBodyWidth = this.screenWidth - (510);
      this.dataResponsiveGridBodyHeight = this.screenHeight - (91+172);
    }
}
