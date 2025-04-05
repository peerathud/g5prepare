import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SortSearchService {
  private sortDataSource = new BehaviorSubject<{ orderBy: string, orderDirection: string }>({ orderBy: 'name', orderDirection: 'asc' });
  currentSortData = this.sortDataSource.asObservable();
  private searchData =new BehaviorSubject<{search:string}>({search:''})
  currentSearchData =this.searchData.asObservable();
  constructor() { }
  updateSortData(orderBy: string, orderDirection: string) {
    this.sortDataSource.next({ orderBy, orderDirection });
  }
  updateSearchData(search:string){
    this.searchData.next({search});
  }
}
