import { Component, Input, Output } from '@angular/core';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { SortSearchService } from '../../services/sort-search.service';
@Component({
  selector: 'app-toolbar',
  imports: [CommonModule,FormsModule,MatSelectModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(public dialog:MatDialog,private sortSearchService:SortSearchService){}
  searchQuery:string='';
  orderBy: string = 'name';
  orderDirection: string = 'asc';
  onSearch() {
    console.log("onSearch:",this.searchQuery)
    this.sortSearchService.updateSearchData(this.searchQuery);
  }
  onSort() {
    this.sortSearchService.updateSortData(this.orderBy, this.orderDirection);  
  }

  onChangeDirection(direction: string) {
    console.log("onChangeDirection",this.orderDirection)
    this.orderDirection = direction;
    this.sortSearchService.updateSortData(this.orderBy, this.orderDirection);  ;
  }
  openAddUser(){
    console.log("Hello addUser")
    const dialogRef= this.dialog.open(AddUserModalComponent,{
      width:'1000px',
      height:'auto',
      maxWidth: '90vw',   
      maxHeight: '90vh'    
    });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log("dialog closed",result)
    })
  }

}
