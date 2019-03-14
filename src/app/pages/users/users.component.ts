import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { randomFill } from "crypto";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  arrUser;
  arr = [];
  constructor(public service: UserService) {}

  ngOnInit() {
    this.service.getUsers().then(result => {
      this.arrUser = result;
    });
  }
}
