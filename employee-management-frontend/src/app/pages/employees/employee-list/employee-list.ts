import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee';


@Component({
    selector: 'app-employee-list',

    imports: [
        RouterLink,
        FormsModule
    ],

    templateUrl: './employee-list.html',
    styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {

    // Employee list
    employees: Employee[] = [];

    // Loading status
    isLoading = false;

    // Search
    searchKeyword = '';


    // ==============================
    // PAGINATION
    // ==============================

    currentPage = 0;

    pageSize = 10;

    totalPages = 0;


    constructor(
        private employeeService: EmployeeService, private cdr: ChangeDetectorRef
    ) {}


    ngOnInit(): void {

        // Load paginated employees
        this.loadEmployeesPage();
    }


    // ==============================
    // LOAD ALL EMPLOYEES
    // ==============================

    loadEmployees(): void {

        this.isLoading = true;

        this.employeeService
            .getAllEmployees()
            .subscribe({

                next: (data: Employee[]) => {

                    this.employees = data;

                    this.isLoading = false; this.cdr.detectChanges();
                },

                error: (error: any) => {

                    console.error(
                        'Error loading employees:',
                        error
                    );

                    this.isLoading = false; this.cdr.detectChanges();
                }

            });
    }


    // ==============================
    // SEARCH EMPLOYEES
    // ==============================

    searchEmployees(): void {

        const keyword =
            this.searchKeyword.trim();


        // If search box is empty,
        // load paginated employees again
        if (!keyword) {

            this.currentPage = 0;

            this.loadEmployeesPage();

            return;
        }


        this.isLoading = true;


        this.employeeService
            .searchEmployees(keyword)
            .subscribe({

                next: (data: Employee[]) => {

                    this.employees = data;

                    this.isLoading = false; this.cdr.detectChanges();
                },

                error: (error: any) => {

                    console.error(
                        'Error searching employees:',
                        error
                    );

                    this.isLoading = false; this.cdr.detectChanges();

                    alert(
                        error.error?.message ||
                        'Failed to search employees'
                    );
                }

            });
    }


    // ==============================
    // CLEAR SEARCH
    // ==============================

    clearSearch(): void {

        this.searchKeyword = '';

        this.currentPage = 0;

        this.loadEmployeesPage();
    }


    // ==============================
    // DELETE EMPLOYEE
    // ==============================

    deleteEmployee(id: number): void {

        const confirmed = confirm(
            'Are you sure you want to delete this employee?'
        );


        if (!confirmed) {
            return;
        }


        this.employeeService
            .deleteEmployee(id)
            .subscribe({

                next: () => {

                    console.log(
                        'Employee deleted successfully'
                    );


                    // Reload current page
                    this.loadEmployeesPage();
                },


                error: (error: any) => {

                    console.error(
                        'Error deleting employee:',
                        error
                    );


                    alert(
                        error.error?.message ||
                        'Failed to delete employee'
                    );
                }

            });
    }


    // ==============================
    // LOAD EMPLOYEE PAGE
    // ==============================

    loadEmployeesPage(): void {

        this.isLoading = true;


        this.employeeService
            .getEmployeesPage(
                this.currentPage,
                this.pageSize
            )
            .subscribe({

                next: (response) => {

                    console.log(
                        'Employee page:',
                        response
                    );


                    this.employees =
                        response.content;


                    this.totalPages =
                        response.totalPages;


                    this.isLoading = false; this.cdr.detectChanges();
                },


                error: (error: any) => {

                    console.error(
                        'Error loading employees:',
                        error
                    );


                    this.isLoading = false; this.cdr.detectChanges();
                }

            });
    }


    // ==============================
    // NEXT PAGE
    // ==============================

    nextPage(): void {

        if (
            this.currentPage <
            this.totalPages - 1
        ) {

            this.currentPage++;

            this.loadEmployeesPage();
        }
    }


    // ==============================
    // PREVIOUS PAGE
    // ==============================

    previousPage(): void {

        if (this.currentPage > 0) {

            this.currentPage--;

            this.loadEmployeesPage();
        }
    }
}