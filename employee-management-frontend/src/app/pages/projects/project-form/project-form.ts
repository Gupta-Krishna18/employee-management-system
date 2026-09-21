import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';

import {
    Router,
    ActivatedRoute,
    RouterLink
} from '@angular/router';

import { Employee } from '../../../models/employee.model';

import { EmployeeService } from '../../../services/employee';
import { ProjectService } from '../../../services/project';


@Component({
    selector: 'app-project-form',

    imports: [
        ReactiveFormsModule,
        RouterLink
    ],

    templateUrl: './project-form.html',
    styleUrl: './project-form.css'
})
export class ProjectFormComponent implements OnInit {

    projectId: number | null = null;

    isEditMode = false;

    employees: Employee[] = [];

    projectForm: FormGroup;


    constructor(
        private fb: FormBuilder,
        private projectService: ProjectService,
        private employeeService: EmployeeService,
        private router: Router,
        private route: ActivatedRoute
    ) {

        // Create form after FormBuilder is initialized
        this.projectForm = this.fb.group({

            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(150)
                ]
            ],

            description: [
                '',
                [
                    Validators.maxLength(1000)
                ]
            ],

            startDate: [
                '',
                Validators.required
            ],

            endDate: [
                '',
                Validators.required
            ],

            status: [
                '',
                Validators.required
            ],

            // number | null
            managerId: [
                null as number | null,
                Validators.required
            ]

        });
    }


    ngOnInit(): void {

        // Load employees for Manager dropdown
        this.loadEmployees();


        // Check whether this is Edit mode
        const id = this.route.snapshot.paramMap.get('id');


        if (id) {

            this.projectId = Number(id);

            this.isEditMode = true;

            this.loadProject(this.projectId);
        }
    }


    // ==============================
    // LOAD EMPLOYEES
    // ==============================

    loadEmployees(): void {

        this.employeeService
            .getAllEmployees()
            .subscribe({

                next: (data: Employee[]) => {

                    this.employees = data;

                    console.log(
                        'Employees loaded:',
                        data
                    );
                },

                error: (error: any) => {

                    console.error(
                        'Error loading employees:',
                        error
                    );
                }
            });
    }


    // ==============================
    // LOAD PROJECT
    // ==============================

    loadProject(id: number): void {

        this.projectService
            .getProjectById(id)
            .subscribe({

                next: (project) => {

                    console.log(
                        'Project loaded:',
                        project
                    );


                    this.projectForm.patchValue({

                        name: project.name,

                        description: project.description,

                        startDate: project.startDate,

                        endDate: project.endDate,

                        status: project.status,

                        managerId: project.managerId

                    });
                },


                error: (error) => {

                    console.error(
                        'Error loading project:',
                        error
                    );


                    alert(
                        error.error?.message ||
                        'Project not found'
                    );


                    this.router.navigate([
                        '/projects'
                    ]);
                }
            });
    }


    // ==============================
    // SUBMIT
    // ==============================

    onSubmit(): void {

        // Check form validation
        if (this.projectForm.invalid) {

            this.projectForm.markAllAsTouched();

            return;
        }


        // Get dates
        const startDate =
            this.projectForm.value.startDate;

        const endDate =
            this.projectForm.value.endDate;


        // Validate date range
        if (
            startDate &&
            endDate &&
            endDate < startDate
        ) {

            alert(
                'End date cannot be before start date.'
            );

            return;
        }


        const projectData =
            this.projectForm.value;


        console.log(
            'Project data:',
            projectData
        );


        // ==============================
        // CREATE PROJECT
        // ==============================

        if (!this.isEditMode) {

            this.projectService
                .createProject(projectData)
                .subscribe({

                    next: (response) => {

                        console.log(
                            'Project created:',
                            response
                        );


                        this.router.navigate([
                            '/projects'
                        ]);
                    },


                    error: (error) => {

                        console.error(
                            'Error creating project:',
                            error
                        );


                        alert(
                            error.error?.message ||
                            'Failed to create project'
                        );
                    }
                });

        }


        // ==============================
        // UPDATE PROJECT
        // ==============================

        else {

            this.projectService
                .updateProject(
                    this.projectId!,
                    projectData
                )
                .subscribe({

                    next: (response) => {

                        console.log(
                            'Project updated:',
                            response
                        );


                        this.router.navigate([
                            '/projects'
                        ]);
                    },


                    error: (error) => {

                        console.error(
                            'Error updating project:',
                            error
                        );


                        alert(
                            error.error?.message ||
                            'Failed to update project'
                        );
                    }
                });
        }
    }
}