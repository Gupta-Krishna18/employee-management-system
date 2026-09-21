import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { DepartmentService } from '../../../services/department';

@Component({
    selector: 'app-department-form',
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './department-form.html',
    styleUrl: './department-form.css'
})
export class DepartmentFormComponent implements OnInit {

    departmentId: number | null = null;
    isEditMode = false;

    departmentForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private departmentService: DepartmentService,
        private router: Router,
        private route: ActivatedRoute
    ) {

        // Create form after FormBuilder is initialized
        this.departmentForm = this.fb.group({

            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(100)
                ]
            ],

            description: [
                '',
                [
                    Validators.maxLength(500)
                ]
            ]

        });
    }

    ngOnInit(): void {

        const id = this.route.snapshot.paramMap.get('id');

        if (id) {

            this.departmentId = Number(id);
            this.isEditMode = true;

            this.loadDepartment(this.departmentId);
        }
    }

    loadDepartment(id: number): void {

        this.departmentService
            .getDepartmentById(id)
            .subscribe({

                next: (department) => {

                    console.log(
                        'Department loaded:',
                        department
                    );

                    this.departmentForm.patchValue({

                        name: department.name,
                        description: department.description

                    });
                },

                error: (error) => {

                    console.error(
                        'Error loading department:',
                        error
                    );

                    alert(
                        error.error?.message ||
                        'Department not found'
                    );

                    this.router.navigate(['/departments']);
                }
            });
    }

    onSubmit(): void {

        if (this.departmentForm.invalid) {

            this.departmentForm.markAllAsTouched();

            return;
        }

        const departmentData = this.departmentForm.value;

        console.log(
            'Department data:',
            departmentData
        );

        // CREATE
        if (!this.isEditMode) {

            this.departmentService
                .createDepartment(departmentData)
                .subscribe({

                    next: (response) => {

                        console.log(
                            'Department created:',
                            response
                        );

                        this.router.navigate([
                            '/departments'
                        ]);
                    },

                    error: (error) => {

                        console.error(
                            'Error creating department:',
                            error
                        );

                        alert(
                            error.error?.message ||
                            'Failed to create department'
                        );
                    }
                });

        }

        // UPDATE
        else {

            this.departmentService
                .updateDepartment(
                    this.departmentId!,
                    departmentData
                )
                .subscribe({

                    next: (response) => {

                        console.log(
                            'Department updated:',
                            response
                        );

                        this.router.navigate([
                            '/departments'
                        ]);
                    },

                    error: (error) => {

                        console.error(
                            'Error updating department:',
                            error
                        );

                        alert(
                            error.error?.message ||
                            'Failed to update department'
                        );
                    }
                });
        }
    }
}