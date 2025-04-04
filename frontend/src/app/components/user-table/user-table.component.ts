import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table',
  imports: [MatPaginatorModule,CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  users =[
    {name:'peerathudd',email:'pp@gmail.com',role:'Super Admin',createDate:'24 oct, 2015'},
    { name: 'Ina Hogan', email: 'windler.warren@runte.net', role: 'Admin', createDate: '24 Oct, 2015' },
    { name: 'Devin Harmon', email: 'winthieser.enos@yahoo.com', role: 'HR Admin', createDate: '18 Dec, 2015' },
    { name: 'Lena Page', email: 'camila.ledner@gmail.com', role: 'Employee', createDate: '8 Oct, 2016' },
    { name: 'Eula Horton', email: 'edula.dorton1221@gmail.com', role: 'Super Admin', createDate: '15 Jun, 2017' },
    { name: 'Victoria Perez', email: 'terilli.wiza@hotmail.com', role: 'HR Admin', createDate: '12 Jan, 2019' },
    { name: 'Cora Medina', email: 'hagenes.isai@hotmail.com', role: 'Employee', createDate: '21 Jul, 2020' },
    { name: 'Ina Hogan', email: 'windler.warren@runte.net', role: 'Admin', createDate: '24 Oct, 2015' },
    { name: 'Devin Harmon', email: 'winthieser.enos@yahoo.com', role: 'HR Admin', createDate: '18 Dec, 2015' },
    { name: 'Lena Page', email: 'camila.ledner@gmail.com', role: 'Employee', createDate: '8 Oct, 2016' },
    { name: 'Eula Horton', email: 'edula.dorton1221@gmail.com', role: 'Super Admin', createDate: '15 Jun, 2017' },
    { name: 'Victoria Perez', email: 'terilli.wiza@hotmail.com', role: 'HR Admin', createDate: '12 Jan, 2019' },
    { name: 'Cora Medina', email: 'hagenes.isai@hotmail.com', role: 'Employee', createDate: '21 Jul, 2020' },
  ]
  pageSize:number =5;
  currentPage:number=0;
  pageSizeOption:number[]=[1,2,3,4,5,6];
  handlePageEvent(pageEvent:any){
    console.log("handlePabeEvent",pageEvent);
    this.currentPage =pageEvent.pageIndex;
    this.pageSize =pageEvent.pageSize;
  }
  get pagedData(){
    const start = this.currentPage*this.pageSize;
    return this.users.slice(start,start+this.pageSize);
  }
  editUser(){
    console.log("Hello edit User")
  }
  deleteUser(){
    console.log("Hello delete user")
  }
}
