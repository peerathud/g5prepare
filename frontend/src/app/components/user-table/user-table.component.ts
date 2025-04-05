import { Component, Input, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { GetAllUserRequest, GetAllUserResponse } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { SortSearchService } from '../../services/sort-search.service';
import { Subscription } from 'rxjs';

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
  constructor(private userService: UserService, private sortSearchService: SortSearchService) { }
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
  editUser() {
    console.log("Hello edit User")
  }
  deleteUser() {
    console.log("Hello delete user")
  }
}
