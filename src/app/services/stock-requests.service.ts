import { Injectable } from '@angular/core';
import { ApiDataService } from "./api-data.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { MatSnackBar } from "@angular/material";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StockRequestsService extends ApiDataService {

  constructor(private http: HttpClient, public snackBar: MatSnackBar,public storageService:StorageService) {
    super();
   }

  getStock() {
    return this.http.get(this.API_URL + "products/getAllEstoque/" + encodeURIComponent(this.getToken()));
  }







  public getToken(){
    let data = JSON.parse(localStorage.getItem("dataUser"));
    return data.userData[0].token;
  }

}
