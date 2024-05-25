import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  selectedFiles!: FileList;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateComponent>,
    private apiService: ApiService
  ) {}

  selectFile(event: any){
    this.selectedFiles = event.target.files;
  }

  uploadFile(){
    if(this.selectedFiles){
      this.apiService.uploadFile(this.selectedFiles.item(0)).subscribe((res:any)=>{
        //snackbar
        console.log(res)
        this.dialogRef.close(true);
      }),(err: any) => {
        console.log(err);
        this.dialogRef.close(false);
      }
    }
  }
}
