import { Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-table',
  imports: [MatPaginator,MatIconModule,CommonModule],
  templateUrl: './doc-table.component.html',
  styleUrl: './doc-table.component.css'
})
export class DocTableComponent {
  AllDocument = [
    {
      id: 1,
      title: 'Quarterly Financial Report',
      date: new Date('2024-03-01'),
      description: 'Q1 report including profit & loss, revenue, and budget allocation.'
    },
    {
      id: 2,
      title: 'Employee Handbook',
      date: new Date('2024-02-10'),
      description: 'General rules, benefits, and company policy guidelines for staff.'
    },
    {
      id: 3,
      title: 'Project Proposal: Smart Locker System',
      date: new Date('2024-03-18'),
      description: 'Initial concept and technical documentation for IoT-based smart locker.'
    },
    {
      id: 4,
      title: 'Monthly Sales Report',
      date: new Date('2024-04-01'),
      description: 'Summary of product sales, top performers, and market trends.'
    },
    {
      id: 5,
      title: 'Security Incident Response Plan',
      date: new Date('2024-01-15'),
      description: 'Standard operating procedures for cyber incidents and response handling.'
    },
    {
      id: 6,
      title: 'Internship Evaluation Form',
      date: new Date('2024-04-06'),
      description: 'Performance review form for evaluating student interns.'
    }
  ];
  // Pagination setup
  pagedDocuments: any[] = [];

  // 🔹 Pagination config
  pageSize = 5;
  currentPage = 0;

  ngOnInit(): void {
    this.updatePagedData();
  }

  // 🔁 Update displayed slice of documents
  updatePagedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedDocuments = this.AllDocument.slice(start, end);
  }

  // 📌 Event from mat-paginator
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }

  // ✏️ Edit / 🗑 Delete logic
  editDoc(id: number): void {
    console.log('Edit document:', id);
  }

  deleteDoc(id: number): void {
    console.log('Delete document:', id);
  }
}
