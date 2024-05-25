
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteComponent>,
    private apiService: ApiService
  ) {}
  
  deleteCompound(){
    this.apiService.deleteCompound(this.data.id).subscribe((res:any)=>{
      //snackbar
      this.dialogRef.close(true);
    })
  }
}
