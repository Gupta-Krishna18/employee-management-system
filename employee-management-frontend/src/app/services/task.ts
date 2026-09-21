import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';
import { WorkspaceEventsService } from './workspace-events';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient, private workspaceEvents: WorkspaceEventsService) {}
  getAllTasks(): Observable<Task[]> { return this.http.get<Task[]>(this.apiUrl); }
  getTaskById(id: number): Observable<Task> { return this.http.get<Task>(`${this.apiUrl}/${id}`); }
  createTask(task: any): Observable<Task> { return this.http.post<Task>(this.apiUrl, task).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  updateTask(id: number, task: any): Observable<Task> { return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  deleteTask(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
}