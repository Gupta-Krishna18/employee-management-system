import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PageResponse } from '../models/page-response.model';
import { Employee } from '../models/employee.model';
import { WorkspaceEventsService } from './workspace-events';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';
  constructor(private http: HttpClient, private workspaceEvents: WorkspaceEventsService) {}
  getAllEmployees(): Observable<Employee[]> { return this.http.get<Employee[]>(this.apiUrl); }
  getEmployeeById(id: number): Observable<Employee> { return this.http.get<Employee>(`${this.apiUrl}/${id}`); }
  createEmployee(employee: any): Observable<Employee> { return this.http.post<Employee>(this.apiUrl, employee).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  updateEmployee(id: number, employee: any): Observable<Employee> { return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  deleteEmployee(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  searchEmployees(keyword: string): Observable<Employee[]> { return this.http.get<Employee[]>(`${this.apiUrl}/search?keyword=${keyword}`); }
  getEmployeesPage(page: number, size: number): Observable<PageResponse<Employee>> { return this.http.get<PageResponse<Employee>>(`${this.apiUrl}/page?page=${page}&size=${size}`); }
}