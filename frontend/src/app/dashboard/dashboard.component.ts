import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { DeleteComponent } from '../operations/delete/delete.component';
import { UpdateComponent } from '../operations/update/update.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  compounds:any = [];
  totalRecords = 0;
  pageSizeOptions = [5, 10, 25, 100];
  pageIndex = 0;
  size = 10;
  
  pageEvent!: PageEvent;
  constructor(private apiService:ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchCompounds();
  }

  fetchCompounds(){
    this.apiService.fetchCompounds(this.pageIndex + 1, this.size).subscribe((res:any) => {
      this.compounds = res.rows;
      this.totalRecords = res.count;
      console.log(this.compounds)
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalRecords = e.length;
    this.size = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.fetchCompounds();
  }

  openUpdateDialog(e:any, compound:any) {
    this.dialog.open(UpdateComponent, {
      width: '750px',
      data: compound
    }).afterClosed().subscribe((res:any)=>{
      if(res){
        this.openSnackBar("Updated Succesfully!");
        this.fetchCompounds();
      }
    });
    e.stopPropagation();
  }

  openDeleteDialog(e:any, compound:any) {
    this.dialog.open(DeleteComponent, {
      data: compound,
      width: '300px'
    }).afterClosed().subscribe((res:any)=>{
      if(res){
        this.openSnackBar("Deleted Succesfully!");
        this.fetchCompounds();
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
