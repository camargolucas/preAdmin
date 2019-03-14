import { Injectable } from "@angular/core";
import { ApiDataService } from "./api-data.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService extends ApiDataService {
  constructor(private http: HttpClient) {
    super();
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "users/getAllUsers").subscribe(
        result => {
          resolve(result);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
