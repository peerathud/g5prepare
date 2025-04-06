import { Component,  } from '@angular/core';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { SortSearchService } from '../../services/sort-search.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-doctoolbar',
  imports: [CommonModule,FormsModule,MatSelectModule,MatIconModule],
  templateUrl: './doctoolbar.component.html',
  styleUrl: './doctoolbar.component.css'
})
export class DoctoolbarComponent {
  constructor(public dialog:MatDialog,private sortSearchService:SortSearchService){}
  searchQuery:string='';
  orderBy: string = 'name';
  orderDirection: string = 'asc';
  displayedColumns: string[] = ['icon', 'title', 'description', 'actions'];
  selectedMonth = 'thisMonth';
  selectedDocType = 'doc';
  onSearch() {
  
  }
  onSort() {
    
  }
  allDocuments = [
    { docId: 1, title: 'Quarterly Report', type: 'PDF', description: 'Q1 financial results', createdDate: new Date() },
    { docId: 2, title: 'Employee Manual', type: 'DOCX', description: 'Company policies', createdDate: new Date() },
  ];
  
  pageSize = 5;
  currentPage = 0;
  totalCount = 15;
  pageSizeOption = [5, 10, 20];
  
  editDocument(id: number) {
    console.log('Edit doc', id);
  }
  
  deleteDocument(id: number) {
    console.log('Delete doc', id);
  }
  
  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.currentPage = e.pageIndex;
  }


}
