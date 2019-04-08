import { Component, OnInit, HostListener } from '@angular/core';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-list-requests-grid',
  templateUrl: './list-requests-grid.component.html',
  styleUrls: ['./list-requests-grid.component.css']
})
export class ListRequestsGridComponent implements OnInit {
  nomeGrupoEconomico:any;
  idGrupoEconomico:any;
  positionOptions: TooltipPosition[] = ['after', 'above'];
  position = new FormControl(this.positionOptions[0]);
  tooltipAbove = new FormControl(this.positionOptions[1]);
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
  selectedColum = "";
  //Define a ordem padrão para o array de itens
  arrOrder = "DESC";
  //Define a tab selecionada no momento da ordenação
  tabarrOrderSelected:any = "";
  dataArrMockUpData = [
    {
      "idGrupoEconomico":1,
      "grupoEconomico":"GERAL",
      "lojas":[
        {
          "idLoja":1,
          "nomeLoja":"Loja 1",
          "idUser":1,
          "nomeUser":"Usuário 1"
        },
        {
          "idLoja":2,
          "nomeLoja":"Loja 2",
          "idUser":2,
          "nomeUser":"Usuário 2"
        },
        {
          "idLoja":3,
          "nomeLoja":"Loja 3",
          "idUser":3,
          "nomeUser":"Usuário 3"
        },
        {
          "idLoja":4,
          "nomeLoja":"Loja 4",
          "idUser":4,
          "nomeUser":"Usuário 4"
        },
        {
          "idLoja":5,
          "nomeLoja":"Loja 5",
          "idUser":5,
          "nomeUser":"Usuário 5"
        },
        {
          "idLoja":6,
          "nomeLoja":"Loja 6",
          "idUser":6,
          "nomeUser":"Usuário 6"
        },
        {
          "idLoja":7,
          "nomeLoja":"Loja 7",
          "idUser":7,
          "nomeUser":"Usuário 7"
        },
        {
          "idLoja":8,
          "nomeLoja":"Loja 8",
          "idUser":8,
          "nomeUser":"Usuário 8"
        },
        {
          "idLoja":9,
          "nomeLoja":"Loja 9",
          "idUser":9,
          "nomeUser":"Usuário 9"
        },
        {
          "idLoja":10,
          "nomeLoja":"Loja 10",
          "idUser":10,
          "nomeUser":"Usuário 10"
        },
        {
          "idLoja":11,
          "nomeLoja":"Loja 11",
          "idUser":11,
          "nomeUser":"Usuário 11"
        },
        {
          "idLoja":12,
          "nomeLoja":"Loja 12",
          "idUser":12,
          "nomeUser":"Usuário 12"
        },
        {
          "idLoja":13,
          "nomeLoja":"Loja 13",
          "idUser":13,
          "nomeUser":"Usuário 13"
        },
        {
          "idLoja":14,
          "nomeLoja":"Loja 14",
          "idUser":14,
          "nomeUser":"Usuário 14"
        },
        {
          "idLoja":15,
          "nomeLoja":"Loja 15",
          "idUser":15,
          "nomeUser":"Usuário 15"
        },
        {
          "idLoja":16,
          "nomeLoja":"Loja 16",
          "idUser":16,
          "nomeUser":"Usuário 16"
        },
        {
          "idLoja":17,
          "nomeLoja":"Loja 17",
          "idUser":17,
          "nomeUser":"Usuário 17"
        },
        {
          "idLoja":18,
          "nomeLoja":"Loja 18",
          "idUser":18,
          "nomeUser":"Usuário 18"
        },
        {
          "idLoja":19,
          "nomeLoja":"Loja 19",
          "idUser":19,
          "nomeUser":"Usuário 19"
        },
        {
          "idLoja":20,
          "nomeLoja":"Loja 20",
          "idUser":20,
          "nomeUser":"Usuário 20"
        },
        {
          "idLoja":21,
          "nomeLoja":"Loja 21",
          "idUser":21,
          "nomeUser":"Usuário 21"
        },
        {
          "idLoja":22,
          "nomeLoja":"Loja 22",
          "idUser":22,
          "nomeUser":"Usuário 22"
        },
        {
          "idLoja":23,
          "nomeLoja":"Loja 23",
          "idUser":23,
          "nomeUser":"Usuário 23"
        },
        {
          "idLoja":24,
          "nomeLoja":"Loja 24",
          "idUser":24,
          "nomeUser":"Usuário 24"
        },
        {
          "idLoja":25,
          "nomeLoja":"Loja 25",
          "idUser":25,
          "nomeUser":"Usuário 25"
        },
        {
          "idLoja":26,
          "nomeLoja":"Loja 26",
          "idUser":26,
          "nomeUser":"Usuário 26"
        },
        {
          "idLoja":27,
          "nomeLoja":"Loja 27",
          "idUser":27,
          "nomeUser":"Usuário 27"
        },
        {
          "idLoja":28,
          "nomeLoja":"Loja 28",
          "idUser":28,
          "nomeUser":"Usuário 28"
        },
        {
          "idLoja":29,
          "nomeLoja":"Loja 29",
          "idUser":29,
          "nomeUser":"Usuário 29"
        },
        {
          "idLoja":30,
          "nomeLoja":"Loja 30",
          "idUser":30,
          "nomeUser":"Usuário 30"
        },
        {
          "idLoja":31,
          "nomeLoja":"Loja 31",
          "idUser":31,
          "nomeUser":"Usuário 31"
        },
        {
          "idLoja":32,
          "nomeLoja":"Loja 32",
          "idUser":32,
          "nomeUser":"Usuário 32"
        },
        {
          "idLoja":33,
          "nomeLoja":"Loja 33",
          "idUser":33,
          "nomeUser":"Usuário 33"
        },
        {
          "idLoja":34,
          "nomeLoja":"Loja 34",
          "idUser":34,
          "nomeUser":"Usuário 34"
        },
        {
          "idLoja":35,
          "nomeLoja":"Loja 35",
          "idUser":35,
          "nomeUser":"Usuário 35"
        },
        {
          "idLoja":36,
          "nomeLoja":"Loja 36",
          "idUser":36,
          "nomeUser":"Usuário 36"
        },
        {
          "idLoja":37,
          "nomeLoja":"Loja 37",
          "idUser":37,
          "nomeUser":"Usuário 37"
        },
        {
          "idLoja":38,
          "nomeLoja":"Loja 38",
          "idUser":38,
          "nomeUser":"Usuário 38"
        },
        {
          "idLoja":39,
          "nomeLoja":"Loja 39",
          "idUser":39,
          "nomeUser":"Usuário 39"
        },
        {
          "idLoja":40,
          "nomeLoja":"Loja 40",
          "idUser":40,
          "nomeUser":"Usuário 40"
        },
        {
          "idLoja":41,
          "nomeLoja":"Loja 41",
          "idUser":41,
          "nomeUser":"Usuário 41"
        },
        {
          "idLoja":42,
          "nomeLoja":"Loja 42",
          "idUser":42,
          "nomeUser":"Usuário 42"
        },
        {
          "idLoja":43,
          "nomeLoja":"Loja 43",
          "idUser":43,
          "nomeUser":"Usuário 43"
        },
        {
          "idLoja":44,
          "nomeLoja":"Loja 44",
          "idUser":44,
          "nomeUser":"Usuário 44"
        },
        {
          "idLoja":45,
          "nomeLoja":"Loja 45",
          "idUser":45,
          "nomeUser":"Usuário 45"
        },
        {
          "idLoja":46,
          "nomeLoja":"Loja 46",
          "idUser":46,
          "nomeUser":"Usuário 46"
        },
        {
          "idLoja":47,
          "nomeLoja":"Loja 47",
          "idUser":47,
          "nomeUser":"Usuário 47"
        },
        {
          "idLoja":48,
          "nomeLoja":"Loja 48",
          "idUser":48,
          "nomeUser":"Usuário 48"
        },
        {
          "idLoja":49,
          "nomeLoja":"Loja 49",
          "idUser":49,
          "nomeUser":"Usuário 49"
        },
        {
          "idLoja":50,
          "nomeLoja":"Loja 50",
          "idUser":50,
          "nomeUser":"Usuário 50"
        }
      ],
      "prePedidos":[
        {
          "id":1,
          "nome":"A abacate 1",
          "status":1,
          "tipo":"F",
          "unidmedida":"Unidade",
          "peso":"18.00",
          "precoVenda": "10.20",
          "precoUnitario":"5.00",
          "precoCusto": "1.00",
          "fornecedor":"Valinhos",
          "dataPedido":"2019-02-28",
          "horaPedido":"8:25:21",
          "dataEntrega":"2019-02-28",
          "indexColuna":0,
          "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },{
          "id":2,
          "nome":"B abacate 2",
          "status":2,
          "tipo":"F",
          "unidmedida":"Kilo",
          "peso":"16.00",
          "precoVenda": "10.20",
          "precoUnitario":"5.00",
          "precoCusto": "5.20",
          "fornecedor":"Valinhos",
          "dataPedido":"2019-02-28",
          "horaPedido":"8:25:21",
          "dataEntrega":"2019-02-28",
          "indexColuna":0,
          "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },{
          "id":3,
          "nome":"C abacate 3",
          "status":3,
          "tipo":"F",
          "unidmedida":"Bandeja",
          "peso":"15.00",
          "precoVenda": "10.20",
          "precoUnitario":"5.00",
          "precoCusto": "5.20",
          "fornecedor":"Valinhos",
          "dataPedido":"2019-02-28",
          "horaPedido":"8:25:21",
          "dataEntrega":"2019-02-28",
          "indexColuna":0,
          "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },{
          "id":4,
          "nome":"D abacate 4",
          "status":4,
          "tipo":"F",
          "unidmedida":"Unidade",
          "peso":"14.00",
          "precoVenda": "10.20",
          "precoUnitario":"5.00",
          "precoCusto": "5.20",
          "fornecedor":"Valinhos",
          "dataPedido":"2019-02-28",
          "horaPedido":"8:25:21",
          "dataEntrega":"2019-02-28",
          "indexColuna":0,
          "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },{
          "id":5,
          "nome":"X abacate 5",
          "status":1,
          "tipo":"F",
          "unidmedida":"Unidade",
          "peso":"13.00",
          "precoVenda": "10.20",
          "precoUnitario":"5.00",
          "precoCusto": "5.20",
          "fornecedor":"Valinhos",
          "dataPedido":"2019-02-28",
          "horaPedido":"8:25:21",
          "dataEntrega":"2019-02-28",
          "indexColuna":0,
          "lojas":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }
      ]
    }
];
  //Elementos das Colunas
  dataArrGridColum = [];
  dataArrGrid:any = [];
  //Necessário um array temporário para não gerar conflito
  //O array temporário recebe as alterações realizadas
  dataArrGridTemp:any = [];
  //####################################################
    //##################################################
    //Variáveis de controle do Painel
  desconto:any = 0;
  totalVolumes:any = 0;
  valorTotalVendas:any = 0;
  valorTotalVendasComDesconto:any = 0;
  valorTotalCompra:any = 0;
  resultado:any = 0;
  //##################################################
  //####################################################
  constructor(
    public storageService:StorageService,
    private route: ActivatedRoute
  ) {
     this.totalVolumes = this.getTotalVolumes();
     this.storageService.insertPrePedidoCache(this.dataArrMockUpData);
   }
  ngOnInit() {
    this.idGrupoEconomico = this.route.snapshot.paramMap.get("id");
    this.getEconomicGroupById(this.idGrupoEconomico);
    let arrStorageCache = this.getEconomicGroupById(this.idGrupoEconomico);
    let arrStorageCacheTemp = this.getEconomicGroupById(this.idGrupoEconomico);
    this.dataArrGridColum = arrStorageCache[0].lojas;
    this.dataArrGrid = arrStorageCache[0].prePedidos;
    this.dataArrGridTemp = arrStorageCacheTemp[0].prePedidos;
    this.getHeightWidthOnStart();
    this.totalVolumes = 0;
    this.valorTotalVendas = 0;
    this.valorTotalVendasComDesconto = 0;
    this.valorTotalCompra = 0;
    this.resultado = 0;
    this.nomeGrupoEconomico =  arrStorageCache[0].grupoEconomico;
  }
  //Ao redimensionar a janela o evento é capturado para que
  //a Grid ajuste a altura atual da janela
  onResize(event) {
    //######################################################
    //redimensiona a div central que contém os dados da Grid
    this.dataResponsiveGridBodyHeight = event.target.innerHeight - (91+167);
    //this.dataResponsiveGridBodyWidth = this.screenWidth - (510);
    //######################################################
  }
  //Captura o evento de redimensionamento da janela
  @HostListener('window:resize', ['$event'])
    getHeightWidthOnStart(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.dataResponsiveGridBodyHeight = this.screenHeight - (91+167);
  }
  //Captura o evento de scroll da janela
  @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event) {
    document.getElementById('dataResponsiveGridShowRight').scrollLeft = event.srcElement.scrollLeft;
    document.getElementById('gridTableDataLeftContainer').scrollTop = event.srcElement.scrollTop;
  }
  //Destaca a linha em foco pelo usuário
  highlightRow(row:any,collum:any){
    this.selectedRow = row;
    this.selectedColum = collum;
  }
  //Chama as funções de ordenação para o array enviado por parâmetro
  orderDataArrGrid(attribute:any, collum?:string){

    if(collum == "c"){
      for(let i = 0; i < this.dataArrGrid.length; i++){
        this.dataArrGridTemp[i].indexColuna = 0;
        this.dataArrGrid[i].indexColuna = 0;
      }
      //Ordena a coluna da tabela
      for(let i = 0; i < this.dataArrGrid.length; i++){
        if(Number(this.dataArrGridTemp[i].lojas[attribute]) > Number(this.dataArrGridTemp[i].indexColuna)){
          this.dataArrGrid[i].indexColuna = this.dataArrGridTemp[i].lojas[attribute];
          this.dataArrGridTemp[i].indexColuna = this.dataArrGridTemp[i].lojas[attribute];
        }
      }

      this.setTabarrOrderSelected(attribute);

      if(this.arrOrder == 'ASC'){
        this.dataArrGrid = this.sortByKeyASC(this.dataArrGrid, "indexColuna");
        this.dataArrGridTemp = this.sortByKeyASC(this.dataArrGridTemp, "indexColuna");
        this.arrOrder = 'DESC';
      }else{
        this.dataArrGrid = this.sortByKeyDESC(this.dataArrGrid, "indexColuna");
        this.dataArrGridTemp = this.sortByKeyDESC(this.dataArrGridTemp, "indexColuna");
        this.arrOrder = 'ASC';
      }

    }else{

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
  }
  //Organiza o array em ordem crescente baseao na chave
  sortByKeyASC(array, key) {
      return array.sort(function(a, b) {
          var x = a[key]; 
          var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
  }
  //Organiza o array em ordem decrescente baseado na chave
  sortByKeyDESC(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; 
        var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }
  //?????????????????????????????????????????
  setTabarrOrderSelected(tab:any){
    this.tabarrOrderSelected = tab;
  }
  //Seta o preço de venda de um item da lista
  setPrecoVenda(data:any, lineIndex:any){
    this.dataArrGridTemp[lineIndex].precoVenda = data;
  }
  //obtém o preço da venda do item a partir do indice do vetor
  getPrecoVenda(lineIndex:any){
    return this.dataArrGridTemp[lineIndex].precoVenda;
  }
  //Obtém o preço da venda unitária do produto
  getPrecoVendaUnitario(lineIndex:any){
    let precoVenda:number = Number(this.dataArrGridTemp[lineIndex].precoVenda);
    let peso:number = Number(this.dataArrGridTemp[lineIndex].peso);
    return precoVenda/peso;
  }
  //Obtém o total de itens
  getTotalItens(index:any){
    let total = 0;
    for(let i = 0; i< this.dataArrGridTemp[index].lojas.length;i++){
      let d = this.dataArrGridTemp[index].lojas[i];
      total += Number(d);
    }
    return total;
  }
  //Obtém o total de volumes de itens
  getTotalVolumes(){
    let total = 0;
    for(let i = 0; i< this.dataArrGridTemp.length; i++){
      for(let j = 0; j< this.dataArrGridTemp[i].lojas.length;j++){
        let d = this.dataArrGridTemp[i].lojas[j];
        total += Number(d);
      }
    }
    return total;
  }
  //??????????????????????????????????????
  setDataCell(data:any, lineIndex:any, columnIndex:any){
    this.dataArrGridTemp[lineIndex].lojas[columnIndex] = data;

  }
  //Obtém o valor total da venda
  getValorTotalVenda(){
    let totalValor = 0;
    for(let i = 0; i< this.dataArrGridTemp.length; i++){
      for(let j = 0; j< this.dataArrGridTemp[i].lojas.length;j++){
        let valTemp = Number(this.dataArrGridTemp[i].precoVenda) * Number(this.dataArrGridTemp[i].lojas[j]);
        totalValor += Number(valTemp);
      }
    }
    return totalValor;
  }
  //Obtém o valor total da venda com desconto
  getValorTotalVendaComDesconto(){
    let totalValor = 0;
    for(let i = 0; i< this.dataArrGridTemp.length; i++){
      for(let j = 0; j< this.dataArrGridTemp[i].lojas.length;j++){
        let valTemp = Number(this.dataArrGridTemp[i].precoVenda) * Number(this.dataArrGridTemp[i].lojas[j]);
        totalValor += Number(valTemp);
      }
    }
    return totalValor - this.desconto;
  }
  //Obtém o valor total da compra
  getValorTotalCompra(){
    let totalValor = 0;
    for(let i = 0; i< this.dataArrGridTemp.length; i++){
      for(let j = 0; j< this.dataArrGridTemp[i].lojas.length;j++){
        let valTemp = Number(this.dataArrGridTemp[i].precoCusto) * Number(this.dataArrGridTemp[i].lojas[j]);
        totalValor += Number(valTemp);
      }
    }
    return totalValor;
  }
  //Obtém o valor do resultado final
  getValorResultadoFinal(){
    let resultado = this.getValorTotalVendaComDesconto() - this.getValorTotalCompra();
    return resultado;
  }
  //Recupera o preço de custo de um elemento especifico baseado na linha da matriz
  getPrecoCusto(lineIndex:any){
    return this.dataArrGridTemp[lineIndex].precoCusto;
  }
  //seta o preço de custo de um elemento especifico
  setPrecoCusto(data:any,lineIndex:any){
    this.dataArrGridTemp[lineIndex].precoCusto = data;
  }
  //Busca o percentual parcial de cada item
  getPercentParcial(lineIndex:any){
    //Verifica se o preco de vanda é menor do que o custo
    //Isso permite calcular corretamente percentuais negativos
    if(Number(this.getPrecoVenda(lineIndex)) < Number(this.getPrecoCusto(lineIndex))){
      let v = Number(this.getPrecoCusto(lineIndex))-Number(this.getPrecoVenda(lineIndex));
      let p =-this.percentage(v, this.getPrecoVenda(lineIndex));
      return p;
    }else{
      let v = Number(this.getPrecoVenda(lineIndex))-Number(this.getPrecoCusto(lineIndex));   
      return this.percentage(v, this.getPrecoCusto(lineIndex));
    }
  }
  //Busca os dados e em seguida calcula a média da porcentagem geral
  getPercentAll(){
    let totalValor = 0;
    //Percorre o array e em seguida soma os valores e calcula a média do percentual
    for(let i = 0; i< this.dataArrGridTemp.length; i++){
      totalValor += (this.getPercentParcial(i) / this.dataArrGridTemp.length);
    }
    return totalValor;
  }
  //Calcula quantos porcento um valor vale de outro
  percentage(partialValue, totalValue) {
    let val = (100 * partialValue) / totalValue;
    return val;
  }
  getEconomicGroupById(id:any){
    let data = this.storageService.getPrePedidoCache();
    let d = data.filter(function(item){ return item.idGrupoEconomico==id; });
    return d;
  }
}