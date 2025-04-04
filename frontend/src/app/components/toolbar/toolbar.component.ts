import { Component } from '@angular/core';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(public dialog:MatDialog){}
  openAddUser(){
    console.log("Hello addUser")
    const dialogRef= this.dialog.open(AddUserModalComponent,{
      width:'1000px',
      height:'auto',
      maxWidth: '90vw',   
      maxHeight: '90vh'    
    });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log("dialog closed")
    })
  }
sortBy(sorttype:string){

}
}
