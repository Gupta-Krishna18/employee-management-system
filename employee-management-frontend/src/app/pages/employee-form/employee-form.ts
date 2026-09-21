import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { EmployeeService } from '../../services/employee';


@Component({
  selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent implements OnInit {

  employeeId: number | null = null;

  isEditMode = false;

  employeeForm;


  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    // Create form after FormBuilder is initialized
    this.employeeForm = this.fb.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$')
        ]
      ],

      designation: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],

      joiningDate: [
        '',
        Validators.required
      ],

      departmentId: [
        null as number | null,
        Validators.required
      ]

    });
  }


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.employeeId = Number(id);

      this.isEditMode = true;

      console.log(
        'Edit Employee ID:',
        this.employeeId
      );

      this.loadEmployee(this.employeeId);
    }
  }


  loadEmployee(id: number): void {

    this.employeeService
      .getEmployeeById(id)
      .subscribe({

        next: (employee) => {

          console.log(
            'Employee loaded:',
            employee
          );

          this.employeeForm.patchValue({

            firstName: employee.firstName,

            lastName: employee.lastName,

            email: employee.email,

            phone: employee.phone,

            designation: employee.designation,

            joiningDate: employee.joiningDate,

            departmentId: employee.departmentId

          });

        },

        error: (error) => {

          console.error(
            'Error loading employee:',
            error
          );

          alert(
            error.error?.message ||
            'Employee not found'
          );

          this.router.navigate(['/employees']);
        }

      });
  }


  onSubmit(): void {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;
    }


    const employeeData = this.employeeForm.value;


    console.log(
      'Employee data:',
      employeeData
    );


    // CREATE EMPLOYEE
    if (!this.isEditMode) {

      this.employeeService
        .createEmployee(employeeData)
        .subscribe({

          next: (response) => {

            console.log(
              'Employee created:',
              response
            );

            this.router.navigate(['/employees']);

          },

          error: (error) => {

            console.error(
              'Error creating employee:',
              error
            );

            alert(
              error.error?.message ||
              'Failed to create employee'
            );

          }

        });

    }


    // UPDATE EMPLOYEE
    else {

      this.employeeService
        .updateEmployee(
          this.employeeId!,
          employeeData
        )
        .subscribe({

          next: (response) => {

            console.log(
              'Employee updated:',
              response
            );

            this.router.navigate(['/employees']);

          },

          error: (error) => {

            console.error(
              'Error updating employee:',
              error
            );

            alert(
              error.error?.message ||
              'Failed to update employee'
            );

          }

        });
    }
  }

}
