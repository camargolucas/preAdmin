import { Usuario } from "./../model/user.model";
import { Injectable } from "@angular/core";
import { ApiDataService } from "./api-data.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { throwError, Observable } from "rxjs";

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

  updateUser(user: Usuario) {
    let userData = JSON.stringify(user);
    return new Promise((resolve, reject) => {
      return this.http
        .put(
          this.API_URL +
            "users/updateUser/" +
            encodeURIComponent(userData) +
            "",
          this.requestOptions
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getLoggedUserLevel() {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
