import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css'] 
})
export class DashboardPage {}
