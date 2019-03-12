import { ApiDataService } from './api-data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiDataService{

  constructor(private http: HttpClient) {
    super();
  }


  //Método de login, recebe os dados necessários para a 
  //autenticação e em seguida retorna os dados do usuário
  public loginAutentication(email:string, senha:string, UUID:string){
    
    let arrUser = {login: email,password: senha,UUID: UUID};
    let usuarioData = JSON.stringify(arrUser);

    return this.http.get(this.API_URL + "users/get/" + encodeURIComponent(usuarioData));
  }

}
