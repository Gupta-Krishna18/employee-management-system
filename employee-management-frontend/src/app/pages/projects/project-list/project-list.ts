import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project';

@Component({
    selector: 'app-project-list',
    imports: [RouterLink],
    templateUrl: './project-list.html',
    styleUrl: './project-list.css'
})
export class ProjectListComponent implements OnInit {

    projects: Project[] = [];

    constructor(
        private projectService: ProjectService
    ) {}

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects(): void {

        this.projectService
            .getAllProjects()
            .subscribe({

                next: (data) => {

                    this.projects = data;

                },

                error: (error) => {

                    console.error(
                        'Error loading projects:',
                        error
                    );

                }
            });
    }

    deleteProject(id: number): void {

        const confirmed = confirm(
            'Are you sure you want to delete this project?'
        );

        if (!confirmed) {
            return;
        }

        this.projectService
            .deleteProject(id)
            .subscribe({

                next: () => {

                    console.log(
                        'Project deleted successfully'
                    );

                    this.loadProjects();

                },

                error: (error) => {

                    console.error(
                        'Error deleting project:',
                        error
                    );

                    alert(
                        error.error?.message ||
                        'Failed to delete project'
                    );
                }
            });
    }
}