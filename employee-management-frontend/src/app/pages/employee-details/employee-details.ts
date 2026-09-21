import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-employee-details',
    imports: [],
    templateUrl: './employee-details.html',
    styleUrl: './employee-details.css'
})
export class EmployeeDetailsComponent {

    employeeId: string | null = null;

    constructor(private route: ActivatedRoute) {

        this.employeeId =
            this.route.snapshot.paramMap.get('id');

    }
}