import { UserService } from '../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatFormField,
  MatSnackBar
} from "@angular/material";
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-block-user-account-dialog',
  templateUrl: './block-user-account-dialog.component.html',
  styleUrls: ['./block-user-account-dialog.component.css']
})
export class BlockUserAccountDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BlockUserAccountDialogComponent>,
    private snackBar: MatSnackBar,
    public service: UserService,
    public storageService:StorageService
  ) { }

  ngOnInit() {
    
  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

  blockUser(){
    this.block(this.data).then(ret => {

      if (ret == 1) {
        if(this.data.ativo == 1){
          
          this.data.ativo = 0;
          this.openSnackBar("Usuário Bloqueado", "Fechar");
        }else{
          this.data.ativo = 1;
          this.openSnackBar("Usuário Desbloqueado", "Fechar");
        }

        this.storageService.updateDataUser(this.data);
        this.onCloseCancel();

      } else {
        if(this.data.ativo == 1){
          this.openSnackBar("Não foi possivel bloquear este usuário", "Fechar");
        }else{
          this.openSnackBar("Não foi possivel desbloquear este usuário", "Fechar");
        }
      }

    });
  }

  block(data:any){
    return this.service.blockUser(data);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}
