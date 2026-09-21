import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EmployeeDashboard } from '../models/employee-dashboard.model';
import { AdminDashboard } from '../models/admin-dashboard.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private apiUrl =
        'http://localhost:8080/api/dashboard';

    constructor(
        private http: HttpClient
    ) {}

    getEmployeeDashboard(
        employeeId: number
    ): Observable<EmployeeDashboard> {

        return this.http.get<EmployeeDashboard>(
            `${this.apiUrl}/employee/${employeeId}`
        );
    }

    getAdminDashboard(): Observable<AdminDashboard> {

        return this.http.get<AdminDashboard>(
            `${this.apiUrl}/admin`
        );
    }
}