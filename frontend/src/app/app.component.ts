import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateComponent } from './operations/create/create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  refreshCompounds = false;
  constructor( public dialog: MatDialog, private _snackBar: MatSnackBar){}

  openUploadDialog(e:any){
    this.dialog.open(CreateComponent).afterClosed().subscribe((res:any)=>{
      if(res){
        window.location.reload();
        // this.openSnackBar('File uploaded successfully!');
      }
    });
    e.stopPropagation();
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, "Close", {
      duration: 5 * 1000,
      verticalPosition: "top"
    });
  }
}
