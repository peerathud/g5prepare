import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-user-table',
  imports: [MatPaginatorModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  currentPage =0;
  handlePageEvent(pageEvent:any){
    console.log("handlePabeEvent",pageEvent);
  }
}
