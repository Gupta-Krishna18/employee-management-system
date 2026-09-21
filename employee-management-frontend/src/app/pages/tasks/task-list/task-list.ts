import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task';

@Component({ selector: 'app-task-list', imports: [RouterLink], templateUrl: './task-list.html', styleUrl: './task-list.css' })
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;
  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.loadTasks(); }
  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe({
      next: (data) => { this.tasks = data; this.isLoading = false; this.cdr.detectChanges(); },
      error: (error) => { console.error('Error loading tasks:', error); this.isLoading = false; this.cdr.detectChanges(); }
    });
  }
  deleteTask(id: number): void {
    if (!confirm('Are you sure you want to delete this task?')) return;
    this.taskService.deleteTask(id).subscribe({ next: () => this.loadTasks(), error: (error) => alert(error.error?.message || 'Failed to delete task') });
  }
}