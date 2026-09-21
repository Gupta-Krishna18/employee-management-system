import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard';

import { EmployeeDetailsComponent }
    from './pages/employee-details/employee-details';

import { EmployeeListComponent }
    from './pages/employees/employee-list/employee-list';

import { EmployeeFormComponent }
    from './pages/employee-form/employee-form';

import { DepartmentListComponent }
    from './pages/departments/department-list/department-list';

import { DepartmentFormComponent }
    from './pages/departments/department-form/department-form';

import { Projects }
    from './pages/projects/projects';

import { Tasks }
    from './pages/tasks/tasks';

import { ProjectListComponent }
    from './pages/projects/project-list/project-list';

import { ProjectFormComponent }
    from './pages/projects/project-form/project-form';

import { TaskListComponent }
    from './pages/tasks/task-list/task-list';

import { TaskFormComponent }
    from './pages/tasks/task-form/task-form';


export const routes: Routes = [


    {
        path: 'tasks',
        component: TaskListComponent
    },

    {
        path: 'tasks/new',
        component: TaskFormComponent
    },

    {
        path: 'tasks/edit/:id',
        component: TaskFormComponent
    },


    {
        path: 'projects',
        component: ProjectListComponent
    },

    {
        path: 'projects/new',
        component: ProjectFormComponent
    },

    {
        path: 'projects/edit/:id',
        component: ProjectFormComponent
    },

    // Dashboard
    {
        path: 'dashboard',
        component: DashboardComponent
    },

    // Employees
    {
        path: 'employees',
        component: EmployeeListComponent
    },

    {
        path: 'employees/new',
        component: EmployeeFormComponent
    },

    {
        path: 'employees/edit/:id',
        component: EmployeeFormComponent
    },

    {
        path: 'employees/:id',
        component: EmployeeDetailsComponent
    },

    // Departments
    {
        path: 'departments',
        component: DepartmentListComponent
    },

    {
        path: 'departments/new',
        component: DepartmentFormComponent
    },

    {
        path: 'departments/edit/:id',
        component: DepartmentFormComponent
    },

    // Projects
    {
        path: 'projects',
        component: Projects
    },

    // Tasks
    {
        path: 'tasks',
        component: Tasks
    },

    // Default route
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }

];