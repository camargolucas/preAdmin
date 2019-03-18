import { StorageService } from '../../services/storage.service';
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  arrUser;
  arr = [];
  searchName;

  constructor(
    public storageService:StorageService,
    public service: UserService
    ) {}

  async ngOnInit() {
    //primeiro buscamos dados no cache local para pré exibir os dados
    this.arrUser = this.storageService.getAllDataUserList();
    //os dados são buscados no servidor e após receber a resposta os dados na tela
    //e o cache são atualizados.
    await this.service.getUsers().then(result => {
      this.arrUser = result;
      this.storageService.insertCacheUsersList(result);
    });
  }

  filter(keyword: string) {
    this.arrUser = this.arrUser.filter(data => {
      return data.apelidoUsuario
        .toLowerCase()
        .startsWith(keyword.toLowerCase());
    });
  }



}
