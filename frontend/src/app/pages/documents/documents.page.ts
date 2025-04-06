import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";

import { UserTableComponent } from "../../components/user-table/user-table.component";
import { DoctoolbarComponent } from "../../components/doctoolbar/doctoolbar.component";
import { DocTableComponent } from "../../components/doc-table/doc-table.component";

@Component({
  selector: 'app-documents',
  standalone: true, 
  imports: [SidebarComponent, HeaderComponent, ToolbarComponent, UserTableComponent, DoctoolbarComponent, DocTableComponent],
  templateUrl: './documents.page.html',
  styleUrl: './documents.page.css'
})
export class DocumentsPage {

}
