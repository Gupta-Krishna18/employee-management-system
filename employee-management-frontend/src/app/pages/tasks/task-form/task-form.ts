import {
    Component,
    OnInit
} from '@angular/core';

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

import { Project } from '../../../models/project.model';
import { Employee } from '../../../models/employee.model';

import { TaskService } from '../../../services/task';
import { ProjectService } from '../../../services/project';
import { EmployeeService } from '../../../services/employee';


@Component({
    selector: 'app-task-form',

    imports: [
        ReactiveFormsModule,
        RouterLink
    ],

    templateUrl: './task-form.html',
    styleUrl: './task-form.css'
})
export class TaskFormComponent implements OnInit {

    taskId: number | null = null;

    isEditMode = false;

    projects: Project[] = [];

    employees: Employee[] = [];

    taskForm: FormGroup;


    constructor(

        private fb: FormBuilder,

        private taskService: TaskService,

        private projectService: ProjectService,

        private employeeService: EmployeeService,

        private router: Router,

        private route: ActivatedRoute

    ) {

        // Create form after FormBuilder is initialized
        this.taskForm = this.fb.group({

            title: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(200)
                ]
            ],

            description: [
                '',
                [
                    Validators.maxLength(1000)
                ]
            ],

            priority: [
                '',
                Validators.required
            ],

            status: [
                '',
                Validators.required
            ],

            // Due Date
            dueDate: [
                '',
                Validators.required
            ],

            // number | null
            projectId: [
                null as number | null,
                Validators.required
            ],

            // number | null
            assignedToId: [
                null as number | null,
                Validators.required
            ]

        });
    }


    ngOnInit(): void {

        this.loadProjects();

        this.loadEmployees();


        const id =
            this.route.snapshot.paramMap.get('id');


        if (id) {

            this.taskId = Number(id);

            this.isEditMode = true;

            this.loadTask(this.taskId);
        }
    }


    // ==============================
    // LOAD PROJECTS
    // ==============================

    loadProjects(): void {

        this.projectService
            .getAllProjects()
            .subscribe({

                next: (data: Project[]) => {

                    this.projects = data;

                    console.log(
                        'Projects loaded:',
                        data
                    );
                },

                error: (error: any) => {

                    console.error(
                        'Error loading projects:',
                        error
                    );
                }

            });
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
    // LOAD TASK
    // ==============================

    loadTask(id: number): void {

        this.taskService
            .getTaskById(id)
            .subscribe({

                next: (task) => {

                    console.log(
                        'Task loaded:',
                        task
                    );


                    this.taskForm.patchValue({

                        title:
                            task.title,

                        description:
                            task.description,

                        priority:
                            task.priority,

                        status:
                            task.status,

                        dueDate:
                            task.dueDate,

                        projectId:
                            task.projectId,

                        assignedToId:
                            task.assignedToId

                    });
                },


                error: (error) => {

                    console.error(
                        'Error loading task:',
                        error
                    );


                    alert(
                        error.error?.message ||
                        'Task not found'
                    );


                    this.router.navigate([
                        '/tasks'
                    ]);
                }

            });
    }


    // ==============================
    // SUBMIT
    // ==============================

    onSubmit(): void {

        // Check form validation
        if (this.taskForm.invalid) {

            this.taskForm.markAllAsTouched();

            return;
        }


        const taskData =
            this.taskForm.value;


        console.log(
            'Task data:',
            taskData
        );


        // ==============================
        // CREATE TASK
        // ==============================

        if (!this.isEditMode) {

            this.taskService
                .createTask(taskData)
                .subscribe({

                    next: (response) => {

                        console.log(
                            'Task created:',
                            response
                        );


                        this.router.navigate([
                            '/tasks'
                        ]);
                    },


                    error: (error) => {

                        console.error(
                            'Error creating task:',
                            error
                        );


                        alert(
                            error.error?.message ||
                            'Failed to create task'
                        );
                    }

                });

        }


        // ==============================
        // UPDATE TASK
        // ==============================

        else {

            this.taskService
                .updateTask(
                    this.taskId!,
                    taskData
                )
                .subscribe({

                    next: (response) => {

                        console.log(
                            'Task updated:',
                            response
                        );


                        this.router.navigate([
                            '/tasks'
                        ]);
                    },


                    error: (error) => {

                        console.error(
                            'Error updating task:',
                            error
                        );


                        alert(
                            error.error?.message ||
                            'Failed to update task'
                        );
                    }

                });
        }
    }
}
