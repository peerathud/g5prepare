import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { UserTableComponent } from "../../components/user-table/user-table.component";



@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule, SidebarComponent, HeaderComponent, ToolbarComponent, UserTableComponent,],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'] 
})
export class DashboardPage {


}
