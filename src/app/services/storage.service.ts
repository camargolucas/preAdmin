import { Usuario } from "../model/user.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor() {}

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
}
