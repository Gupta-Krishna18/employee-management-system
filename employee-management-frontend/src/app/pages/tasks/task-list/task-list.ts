import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task';

@Component({
    selector: 'app-task-list',
    imports: [RouterLink],
    templateUrl: './task-list.html',
    styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {

    tasks: Task[] = [];

    constructor(
        private taskService: TaskService
    ) {}

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {

        this.taskService
            .getAllTasks()
            .subscribe({

                next: (data) => {

                    this.tasks = data;

                    console.log(
                        'Tasks loaded:',
                        data
                    );
                },

                error: (error) => {

                    console.error(
                        'Error loading tasks:',
                        error
                    );

                }

            });
    }

    deleteTask(id: number): void {

        const confirmed = confirm(
            'Are you sure you want to delete this task?'
        );

        if (!confirmed) {
            return;
        }

        this.taskService
            .deleteTask(id)
            .subscribe({

                next: () => {

                    console.log(
                        'Task deleted successfully'
                    );

                    this.loadTasks();

                },

                error: (error) => {

                    console.error(
                        'Error deleting task:',
                        error
                    );

                    alert(
                        error.error?.message ||
                        'Failed to delete task'
                    );

                }

            });
    }
}