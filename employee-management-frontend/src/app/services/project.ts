import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Project } from '../models/project.model';
import { WorkspaceEventsService } from './workspace-events';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';
  constructor(private http: HttpClient, private workspaceEvents: WorkspaceEventsService) {}
  getAllProjects(): Observable<Project[]> { return this.http.get<Project[]>(this.apiUrl); }
  getProjectById(id: number): Observable<Project> { return this.http.get<Project>(`${this.apiUrl}/${id}`); }
  createProject(project: any): Observable<Project> { return this.http.post<Project>(this.apiUrl, project).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  updateProject(id: number, project: any): Observable<Project> { return this.http.put<Project>(`${this.apiUrl}/${id}`, project).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
  deleteProject(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => this.workspaceEvents.requestRefresh())); }
}