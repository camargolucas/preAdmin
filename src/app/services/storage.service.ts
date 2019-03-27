import { Usuario } from "../model/user.model";
import { Injectable } from "@angular/core";
import { EconomicGroup } from "../model/economic-group.model";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor() {}
  //###########################################
  //###########################################
  //Controle de dados de login do usuário
  insertDataLogedUser(dataUser: any): boolean {
    try {
      localStorage.setItem("dataUser", JSON.stringify(dataUser));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  checkIfUserIsLogged(): boolean {
    try {
      let data = JSON.parse(localStorage.getItem("dataUser"));

      if (data["userData"] != undefined) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  removeDataLoggedUser(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  getAllDataLoggedUser(): Usuario {
    let usuario: Usuario = new Usuario();
    try {
      let data = JSON.parse(localStorage.getItem("dataUser"));
      usuario.idUsuario = data["userData"][0]["idUsuario"];
      usuario.nomeUsuario = data["userData"][0]["nomeUsuario"];
      usuario.email = null;
      usuario.senha = null;
      usuario.loja = data["userData"][0]["loja"];
      usuario.idCargo = data["userData"][0]["idCargo"];
      usuario.ativo = data["userData"][0]["ativo"];
      usuario.apelidoUsuario = data["userData"][0]["apelidoUsuario"];
      usuario.token = data["userData"][0]["token"];
      usuario.logado = data["userData"][0]["logado"];
      return usuario;
    } catch (e) {
      console.log(e);
    }
  }
  //###########################################
  //###########################################

  //###########################################
  //###########################################
  //Controle de cache dos dados do grupo econômico
  insertCacheEconomicGroup(data: any) {
    try {
      localStorage.setItem("dataEconomicGroup", JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  getAllDataEconomicGroup() {
    return JSON.parse(localStorage.getItem("dataEconomicGroup"));
  }
  getTotalEconomicGroup() {
    let arr = this.getAllDataEconomicGroup();
    return arr.length;
  }
  getAllEconomicGroupClientList(id:any) {

    let arrData =  JSON.parse(localStorage.getItem("dataClientList"));

    if(arrData != undefined && arrData != null){

      return arrData.filter(function (el) {

        return (el.IDGRUPOECONOMICOCLIENTE === id);

      });

    }else{

      return null;

    }

  }
  getEconomicGroupById(id:any){
    let arrData = this.getAllDataEconomicGroup();

    if(arrData != undefined && arrData != null){
      return arrData.filter(function (el) {
        return (el.idGrupoEconomicoCliente === id);
      });
    }else{
      return null;
    }
  }
  getEconomicGroupNameById(id:any){

    let arrData = this.getEconomicGroupById(id);

    if(arrData != undefined && arrData != null){

      return arrData[0]['nomeGrupoEconomicoCliente'];

    }else{

      return null;

    }

  }
  //###########################################
  //###########################################
  //Controla o Cache da lista dos usuários
  updateDataUser(user){
  
    let arrUser: Array<Usuario> = this.getAllDataUserList();

    for (var i = 0; i < arrUser.length; ++i) {
      if (arrUser[i]['idUsuario'] === user.idUsuario) {
        arrUser[i]['ativo'] = user.ativo;
      }
    }

    this.insertCacheUsersList(arrUser);
  
  }
  insertCacheUsersList(data: any) {
    try {
      localStorage.setItem("dataUsersList", JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  getAllDataUserList() {
    return JSON.parse(localStorage.getItem("dataUsersList"));
  }
  getTotalUsers() {
    let arr = this.getAllDataUserList();
    return arr.length;
  }
  //###########################################
  //###########################################
  insertCacheClientList(data: any) {
    try {
      localStorage.setItem("dataClientList", JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  getAllClientList() {
    return JSON.parse(localStorage.getItem("dataClientList"));
  }
  //###########################################
  //###########################################

  //###########################################
  //###########################################
  getTotalClient() {
    let arr = this.getAllClientList();
    return arr.length;
  }
  updateClient(user) {
    return new Promise(resolve => {

      if(user.idCargo == 1){

        let arrUser: Array<Usuario> = this.getAllDataUserList();

        for (var i = 0; i < arrUser.length; ++i) {
          if (arrUser[i]['idUsuario'] === user.idUsuario) {
            arrUser[i]['email'] = user.email;
            arrUser[i]['nomeUsuario'] = user.nomeUsuario;
            arrUser[i]['apelidoUsuario'] = user.apelidoUsuario;
            arrUser[i]['loja'] = user.loja;
            arrUser[i]['ativo'] = user.ativo;
          }
        }
    
        this.insertCacheUsersList(arrUser);

        resolve(arrUser);
      }else{
  
        let arrUser: Array<Usuario> = this.getManagerList();

        for (var i = 0; i < arrUser.length; ++i) {
          if (arrUser[i]['idUsuario'] === user.idUsuario) {
            arrUser[i]['email'] = user.email;
            arrUser[i]['nomeUsuario'] = user.nomeUsuario;
            arrUser[i]['apelidoUsuario'] = user.apelidoUsuario;
            arrUser[i]['loja'] = user.loja;
            arrUser[i]['ativo'] = user.ativo;
          }
        }
        this.insertCacheManagerList(arrUser);
        resolve(arrUser);
      }
    });
  }
  //###########################################
  //###########################################
  getTotalManagerList(){
    try {
      let arr = this.getManagerList();
      return arr.length;
    } catch (error) {
      return 0;
    }

  }
  getManagerList(){
    return JSON.parse(localStorage.getItem("dataManagerList"));
  }
  insertCacheManagerList(data: any){
    try {
      localStorage.setItem("dataManagerList", JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    } 
  }
  //###########################################
  //###########################################


    //###########################################
  //###########################################
  getTotalStockList(){
    try {
      let arr = this.getManagerList();
      return arr.length;
    } catch (error) {
      return 0;
    }
  }
  getStockList(){
    return JSON.parse(localStorage.getItem("dataStockList"));
  }
  insertCacheStockList(data: any){
    try {
      localStorage.setItem("dataStockList", JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    } 
  }
  //###########################################
  //###########################################
}
