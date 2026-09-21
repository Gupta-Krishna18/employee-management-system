import {
    Component,
    OnInit
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { DashboardService } from '../../services/dashboard';

import { AdminDashboard } from '../../models/admin-dashboard.model';

@Component({
    selector: 'app-dashboard',
    imports: [RouterLink],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

    dashboard: AdminDashboard | null = null;
    isLoading = false;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.loadDashboard();
    }

    loadDashboard(): void {
        this.isLoading = true;
        this.dashboardService.getAdminDashboard().subscribe({
            next: (data) => {
                this.dashboard = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading dashboard:', error);
                this.isLoading = false;
            }
        });
    }
}
