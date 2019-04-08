import { Injectable } from '@angular/core';
import { ApiDataService } from "./api-data.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ApiDataService{

  constructor(private http: HttpClient) {
    super();
   }

  getClientList(){
    return this.http.get(this.API_URL + "admin/client/getAll/" + encodeURIComponent(this.getToken()));
  }
  public getToken(){
    let data = JSON.parse(localStorage.getItem("dataUser"));
    return data.userData[0].token;
  }

}
