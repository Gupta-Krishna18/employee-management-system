import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project';

@Component({ selector: 'app-project-list', imports: [RouterLink], templateUrl: './project-list.html', styleUrl: './project-list.css' })
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  isLoading = true;
  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.loadProjects(); }
  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe({
      next: (data) => { this.projects = data; this.isLoading = false; this.cdr.detectChanges(); },
      error: (error) => { console.error('Error loading projects:', error); this.isLoading = false; this.cdr.detectChanges(); }
    });
  }
  deleteProject(id: number): void {
    if (!confirm('Are you sure you want to delete this project?')) return;
    this.projectService.deleteProject(id).subscribe({ next: () => this.loadProjects(), error: (error) => alert(error.error?.message || 'Failed to delete project') });
  }
}