import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Department } from '../models/department.model';
import { WorkspaceEventsService } from './workspace-events';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private apiUrl = 'http://localhost:8080/api/departments';
  constructor(private http: HttpClient, private workspaceEvents: WorkspaceEventsService) {}
  getAllDepartments(): Observable<Department[]> { return this.http.get<Department[]>(this.apiUrl); }
  getDepartmentById(id: number): Observable<Department> { return this.http.get<Department>(`${this.apiUrl}/${id}`); }
  createDepartment(department: any): Observable<Department> { return this.http.post<Department>(this.apiUrl, department).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  updateDepartment(id: number, department: any): Observable<Department> { return this.http.put<Department>(`${this.apiUrl}/${id}`, department).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  deleteDepartment(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
}