import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Department } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department';

@Component({ selector: 'app-department-list', imports: [RouterLink], templateUrl: './department-list.html', styleUrl: './department-list.css' })
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  isLoading = true;
  constructor(private departmentService: DepartmentService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.loadDepartments(); }
  loadDepartments(): void {
    this.isLoading = true;
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => { this.departments = data; this.isLoading = false; this.cdr.detectChanges(); },
      error: (error) => { console.error('Error loading departments:', error); this.isLoading = false; this.cdr.detectChanges(); }
    });
  }
  deleteDepartment(id: number): void {
    if (!confirm('Are you sure you want to delete this department?')) return;
    this.departmentService.deleteDepartment(id).subscribe({ next: () => this.loadDepartments(), error: (error) => alert(error.error?.message || 'Failed to delete department') });
  }
}