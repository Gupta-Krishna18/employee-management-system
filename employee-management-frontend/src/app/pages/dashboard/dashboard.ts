import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard';
import { WorkspaceEventsService } from '../../services/workspace-events';
import { AdminDashboard } from '../../models/admin-dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboard: AdminDashboard | null = null;
  isLoading = false;
  private refreshSubscription?: Subscription;

  constructor(private dashboardService: DashboardService, private workspaceEvents: WorkspaceEventsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.refreshSubscription = this.workspaceEvents.refreshRequested$.subscribe(() => this.loadDashboard());
  }

  ngOnDestroy(): void { this.refreshSubscription?.unsubscribe(); }

  get completionRate(): number {
    if (!this.dashboard?.totalTasks) return 0;
    return Math.round((this.dashboard.completedTasks / this.dashboard.totalTasks) * 100);
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.dashboardService.getAdminDashboard().subscribe({
      next: (data) => { this.dashboard = data; this.isLoading = false; this.cdr.detectChanges(); },
      error: (error) => { console.error('Error loading dashboard:', error); this.isLoading = false; this.cdr.detectChanges(); }
    });
  }
}