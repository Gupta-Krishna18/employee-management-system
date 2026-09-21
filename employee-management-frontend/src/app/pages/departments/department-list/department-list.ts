import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Department } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department';

@Component({
    selector: 'app-department-list',
    imports: [RouterLink],
    templateUrl: './department-list.html',
    styleUrl: './department-list.css'
})
export class DepartmentListComponent implements OnInit {

    departments: Department[] = [];

    constructor(
        private departmentService: DepartmentService
    ) {}

    ngOnInit(): void {
        this.loadDepartments();
    }

    loadDepartments(): void {

        this.departmentService
            .getAllDepartments()
            .subscribe({

                next: (data) => {

                    this.departments = data;

                },

                error: (error) => {

                    console.error(
                        'Error loading departments:',
                        error
                    );

                }
            });
    }

    deleteDepartment(id: number): void {

        const confirmed = confirm(
            'Are you sure you want to delete this department?'
        );

        if (!confirmed) {
            return;
        }

        this.departmentService
            .deleteDepartment(id)
            .subscribe({

                next: () => {

                    console.log(
                        'Department deleted successfully'
                    );

                    this.loadDepartments();

                },

                error: (error) => {

                    console.error(
                        'Error deleting department:',
                        error
                    );

                    alert(
                        error.error?.message ||
                        'Failed to delete department'
                    );
                }
            });
    }
}