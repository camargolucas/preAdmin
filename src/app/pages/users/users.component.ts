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
  constructor(public service: UserService) {}

  async ngOnInit() {
    await this.service.getUsers().then(result => {
      this.arrUser = result;
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
