import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor() {}
  insertDataLogedUser(dataUser: any):boolean {
    try {
      localStorage.setItem("dataUser", JSON.stringify(dataUser));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  checkIfUserIsLogged():boolean {
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

  removeDataLoggedUser():boolean{
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
