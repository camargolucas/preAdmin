import { listUser } from "./../../class/listUser";
import { Usuario } from "./../../class/user";
import { PipeTransform, Pipe } from "@angular/core";
import { pipe } from "@angular/core/src/render3";

@Pipe({
  name: "userFilter"
})
export class UserFilterPipe implements PipeTransform {
  transform(users: Usuario[], searchTerm: string) {
    if (!users || !searchTerm) {
      return users;
    }

    let arrUser = users.filter(user => {
      return user.apelidoUsuario
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
    });
    return arrUser;
  }
}
