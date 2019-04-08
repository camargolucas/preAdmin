import { Injectable } from '@angular/core';
import { ApiDataService } from "./api-data.service";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})

export class EconomicGroupService extends ApiDataService{
  constructor(
    private http: HttpClient
    ) {
    super();
  }

  public getEconomicGroupList(){
    return this.http.get(this.API_URL + "admin/economic-group-list/getAll/" + encodeURIComponent(this.getToken()), this.requestOptions);
  }

  public getToken(){
    let data = JSON.parse(localStorage.getItem("dataUser"));
    console.log("token : " + data.userData[0].token);
    return data.userData[0].token;
  }
}
