import { Component, Input, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { GetAllUserRequest, GetAllUserResponse } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { SortSearchService } from '../../services/sort-search.service';
import { Subscription } from 'rxjs';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-table',
  imports: [MatPaginatorModule, CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  allUsers: any[] = [];
  totalCount: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  pageSizeOption: number[] = [1, 2, 3, 4, 5, 6];
  searchQuery: string = '';
  orderBy: string = 'name';
  orderDirection: string = 'asc';
  private sortSubscription!: Subscription;
  private searchSubscription!: Subscription;
  constructor(private userService: UserService, private sortSearchService: SortSearchService,public dialog:MatDialog) { }
  ngOnInit() {

    this.sortSubscription = this.sortSearchService.currentSortData.subscribe(sortData => {
      this.orderBy = sortData.orderBy;
      this.orderDirection = sortData.orderDirection;
      this.getUsers();
    });
    this.searchSubscription = this.sortSearchService.currentSearchData.subscribe(searchData => {
      this.searchQuery = searchData.search;
      this.getUsers();
    });
  }
  ngOnDestroy() {
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
  handlePageEvent(pageEvent: any) {
    console.log("handlePabeEvent", pageEvent);
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.getUsers();
  }
  getUsers() {
    const requestData: GetAllUserRequest = {
      search: this.searchQuery,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      pageNumber: this.currentPage + 1,
      pageSize: this.pageSize
    }
    console.log(requestData)
    this.userService.getAllUsers(requestData).subscribe(
      (response: GetAllUserResponse) => {
        this.allUsers = response.dataSource
        this.totalCount = response.totalCount;
        console.log("loadresponse", response)
        console.log("Alluser", this.allUsers)
      },
      (error) => {
        console.error('Error occurred:', error);


      }
    );
  }
  editUser(userId:any) {
    const dialogRef =this.dialog.open(EditUserComponent,{
      width:'1000px',
      height:'auto',
      maxWidth: '90vw',   
      maxHeight: '90vh',
      data: { userId: userId }  
    });
    dialogRef.componentInstance.userupdated.subscribe(()=>{
      console.log("edit user reload");
      this.ngOnInit();
    })
    dialogRef.afterClosed().subscribe((result)=>{
      if (result) {
        console.log('Edited user:', result);
        // อัปเดตข้อมูล
      }
    })
    console.log("Hello edit User userId",userId)
  }
  deleteUser(id:string) {
    console.log("id?",id)
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this user?`,
      icon: 'warning',
      showCancelButton: true,  
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true  
    }).then((result) => {
      if (result.isConfirmed) {
       
        this.userService.deleteUser(id).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            this.ngOnInit();  
          },
          (error) => {
            Swal.fire('Error!', 'There was an error deleting the user.', 'error');
          }
        );
      } else if (result.isDismissed) {
       
        Swal.fire('Cancelled', 'The user was not deleted.', 'info');
      }
    });
  }
  }

